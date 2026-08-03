export default class Accounts {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)      { return id ? this.#client.get(`/accounts/${id}`) : this.#client.get('/accounts'); }
    create(data)        { return this.#client.put('/accounts', data); }
    edit(id, data)      { return this.#client.patch(`/accounts/${id}`, data); }
    delete(id)          { return this.#client.del(`/accounts/${id}`); }

    moves(accountId) {
        const base = `/accounts/${accountId}/moves`;
        return {
            get:    (id = null) => id ? this.#client.get(`${base}/${id}`) : this.#client.get(base),
            create: (data)      => this.#client.put(base, data),
            edit:   (id, data)  => this.#client.patch(`${base}/${id}`, data),
            delete: (id)        => this.#client.del(`${base}/${id}`),
        };
    }
}
