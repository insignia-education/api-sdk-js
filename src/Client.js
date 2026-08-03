export default class InsigniaClient {
    #baseUrl;
    #cookies = new Map();

    constructor(baseUrl) {
        this.#baseUrl = InsigniaClient._resolve(baseUrl);
    }

    static _resolve(baseUrl) {
        const envBaseUrl = typeof process !== 'undefined'
            ? process.env?.INSIGNIA_EDUCATION_API_BASE_URL ?? null
            : null;

        baseUrl = baseUrl ?? envBaseUrl ?? 'https://insigniaeducation.com';
        baseUrl = baseUrl.replace(/\/$/, '');
        return baseUrl;
    }

    #headers() {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        if (this.#baseUrl.includes('ngrok')) headers['ngrok-skip-browser-warning'] = 'true';

        const cookie = this.#cookieHeader();
        if (cookie) headers.Cookie = cookie;

        return headers;
    }

    #cookieHeader() {
        if (typeof window !== 'undefined' || this.#cookies.size === 0) return null;

        return Array.from(this.#cookies.entries())
            .map(([name, value]) => `${name}=${value}`)
            .join('; ');
    }

    #storeCookies(response) {
        if (typeof window !== 'undefined') return;

        const headers = response.headers;
        const setCookies = typeof headers?.getSetCookie === 'function'
            ? headers.getSetCookie()
            : [headers?.get?.('set-cookie')].filter(Boolean);

        for (const setCookie of setCookies) {
            const [pair] = setCookie.split(';');
            const separator = pair.indexOf('=');
            if (separator === -1) continue;

            this.#cookies.set(pair.slice(0, separator), pair.slice(separator + 1));
        }
    }

    async #parseResponse(response) {
        if ([204, 205].includes(response.status)) return null;

        try {
            if (typeof response.text === 'function') {
                const text = await response.text();
                return text === '' ? null : JSON.parse(text);
            }

            return await response.json();
        } catch (error) {
            if (error instanceof SyntaxError && error.message.includes('Unexpected end')) {
                return null;
            }
            throw error;
        }
    }

    async #request(method, path, body = null) {
        const options = { method, headers: this.#headers(), credentials: 'include' };
        if (body !== null) options.body = JSON.stringify(body);
        const response = await fetch(`${this.#baseUrl}${path}`, options);
        this.#storeCookies(response);
        if (!response.ok) {
            const err = new Error(`HTTP ${response.status}`);
            err.status = response.status;
            try { err.data = await this.#parseResponse(response); } catch { /* body wasn't parseable — leave err.data unset */ }
            throw err;
        }
        const data = await this.#parseResponse(response);
        return data?.success ? data.response : data;
    }

    async upload(path, formData) {
        const headers = { 'Accept': 'application/json' };
        if (this.#baseUrl.includes('ngrok')) headers['ngrok-skip-browser-warning'] = 'true';
        const cookie  = this.#cookieHeader();
        if (cookie) headers.Cookie = cookie;
        const response = await fetch(`${this.#baseUrl}${path}`, {
            method: 'PUT', headers, credentials: 'include', body: formData,
        });
        this.#storeCookies(response);
        if (!response.ok) {
            const err = new Error(`HTTP ${response.status}`);
            err.status = response.status;
            try { err.data = await this.#parseResponse(response); } catch { /* body wasn't parseable — leave err.data unset */ }
            throw err;
        }
        const data = await this.#parseResponse(response);
        return data?.success ? data.response : data;
    }

    get(path, params = null) {
        if (params && typeof params === 'object') {
            const qs = new URLSearchParams(
                Object.entries(params).filter(([, v]) => v !== undefined && v !== null)
            ).toString();
            if (qs) path += (path.includes('?') ? '&' : '?') + qs;
        }
        return this.#request('GET', path);
    }
    post(path, body = null) { return this.#request('POST',   path, body); }
    put(path, body = null)  { return this.#request('PUT',    path, body); }
    patch(path, body = null){ return this.#request('PATCH',  path, body); }
    del(path)               { return this.#request('DELETE', path); }
}
