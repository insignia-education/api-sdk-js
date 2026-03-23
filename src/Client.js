export default class InsigniaClient {
    #baseUrl;

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
        return { 'Content-Type': 'application/json' };
    }

    async #request(method, path, body = null) {
        const options = { method, headers: this.#headers(), credentials: 'include' };
        if (body !== null) options.body = JSON.stringify(body);
        const response = await fetch(`${this.#baseUrl}${path}`, options);
        const data = await response.json();
        return data?.success ? data.response : data;
    }

    get(path)               { return this.#request('GET',    path); }
    post(path, body = null) { return this.#request('POST',   path, body); }
    put(path, body = null)  { return this.#request('PUT',    path, body); }
    patch(path, body = null){ return this.#request('PATCH',  path, body); }
    del(path)               { return this.#request('DELETE', path); }
}
