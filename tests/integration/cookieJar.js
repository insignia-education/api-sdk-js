// Wraps globalThis.fetch with a simple cookie jar so HTTP-only cookies
// set by the server are replayed on subsequent requests — mirrors what
// browsers do automatically but Node.js does not.

const jar = new Map(); // origin → { name: value }

const _fetch = globalThis.fetch;

globalThis.fetch = async function (url, options = {}) {
    const origin = new URL(url).origin;

    // Inject stored cookies for this origin
    const stored = jar.get(origin);
    if (stored && Object.keys(stored).length > 0) {
        const cookieStr = Object.entries(stored)
            .map(([k, v]) => `${k}=${v}`)
            .join('; ');
        options = { ...options, headers: { ...options.headers, Cookie: cookieStr } };
    }

    const response = await _fetch(url, options);

    // Capture Set-Cookie headers (getSetCookie() returns each header separately,
    // avoiding the comma-in-Expires parsing problem)
    const setCookies = response.headers.getSetCookie?.() ??
        [response.headers.get('set-cookie')].filter(Boolean);

    for (const raw of setCookies) {
        const nameVal = raw.split(';')[0].trim();
        const eq = nameVal.indexOf('=');
        if (eq < 1) continue;

        const name = nameVal.slice(0, eq).trim();
        const value = nameVal.slice(eq + 1).trim();
        const attrs = raw.toLowerCase();
        const isDeleted = attrs.includes('max-age=0') ||
            attrs.includes('expires=thu, 01 jan 1970');

        if (!jar.has(origin)) jar.set(origin, {});
        if (isDeleted) {
            delete jar.get(origin)[name];
        } else {
            jar.get(origin)[name] = value;
        }
    }

    return response;
};
