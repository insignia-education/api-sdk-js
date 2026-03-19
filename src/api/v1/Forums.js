export default class Forums {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)  { return id ? this.#client.get(`/forums/${id}`) : this.#client.get('/forums'); }
    create(data)    { return this.#client.put('/forums', data); }
    edit(id, data)  { return this.#client.patch(`/forums/${id}`, data); }
    delete(id)      { return this.#client.del(`/forums/${id}`); }
    approve(id)     { return this.#client.post(`/forums/${id}/approve`); }

    responses(forumId) {
        const base = `/forums/${forumId}/responses`;
        return {
            get:     (id = null) => id ? this.#client.get(`${base}/${id}`) : this.#client.get(base),
            create:  (data)      => this.#client.put(base, data),
            edit:    (id, data)  => this.#client.patch(`${base}/${id}`, data),
            delete:  (id)        => this.#client.del(`${base}/${id}`),
            approve: (id)        => this.#client.post(`${base}/${id}/approve`),
        };
    }
}
