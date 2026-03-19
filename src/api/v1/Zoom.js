export default class Zoom {
    #client;

    constructor(client) {
        this.#client = client;
    }

    meetings() {
        return {
            get: (id = null) => id ? this.#client.get(`/zoom/meetings/${id}`) : this.#client.get('/zoom/meetings'),
        };
    }

    tokens() {
        const base = '/zoom/tokens';
        return {
            get:    (id = null) => id ? this.#client.get(`${base}/${id}`) : this.#client.get(base),
            create: (data)      => this.#client.put(base, data),
            edit:   (id, data)  => this.#client.patch(`${base}/${id}`, data),
            delete: (id)        => this.#client.del(`${base}/${id}`),
        };
    }
}
