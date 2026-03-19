export default class InsigniaClient {
    #baseUrl;
    #token;

    constructor(baseUrl = null, token = null) {
        const resolved = baseUrl
            ?? process.env.INSIGNIA_EDUCATION_API_BASE_URL
            ?? 'https://insigniaeducation.com';
        this.#baseUrl = resolved.replace(/\/$/, '');
        this.#token = token;
    }

    setToken(token) {
        this.#token = token;
    }

    getToken() {
        return this.#token;
    }

    #headers() {
        const headers = { 'Content-Type': 'application/json' };
        if (this.#token) headers['Authorization'] = `Bearer ${this.#token}`;
        return headers;
    }

    async #request(method, path, body = null) {
        const options = { method, headers: this.#headers() };
        if (body !== null) options.body = JSON.stringify(body);
        const response = await fetch(`${this.#baseUrl}${path}`, options);
        return response.json();
    }

    get(path)              { return this.#request('GET',    path); }
    post(path, body = null){ return this.#request('POST',   path, body); }
    put(path, body = null) { return this.#request('PUT',    path, body); }
    patch(path, body = null){ return this.#request('PATCH', path, body); }
    del(path)              { return this.#request('DELETE', path); }
}
