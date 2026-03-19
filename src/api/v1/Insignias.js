export default class Insignias {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)  { return id ? this.#client.get(`/insignias/${id}`) : this.#client.get('/insignias'); }
    create(data)    { return this.#client.put('/insignias', data); }
    edit(id, data)  { return this.#client.patch(`/insignias/${id}`, data); }
    delete(id)      { return this.#client.del(`/insignias/${id}`); }
}
