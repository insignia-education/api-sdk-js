export default class Taxes {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)  { return id ? this.#client.get(`/taxes/${id}`) : this.#client.get('/taxes'); }
    create(data)    { return this.#client.put('/taxes', data); }
    edit(id, data)  { return this.#client.patch(`/taxes/${id}`, data); }
    delete(id)      { return this.#client.del(`/taxes/${id}`); }
}
