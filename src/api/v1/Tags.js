export default class Tags {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)  { return id ? this.#client.get(`/tags/${id}`) : this.#client.get('/tags'); }
    create(data)    { return this.#client.put('/tags', data); }
    edit(id, data)  { return this.#client.patch(`/tags/${id}`, data); }
    delete(id)      { return this.#client.del(`/tags/${id}`); }
}
