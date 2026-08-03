export default class Languages {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)      { return id ? this.#client.get(`/languages/${id}`) : this.#client.get('/languages'); }
    create(data)        { return this.#client.put('/languages', data); }
    edit(id, data)      { return this.#client.patch(`/languages/${id}`, data); }
    delete(id)          { return this.#client.del(`/languages/${id}`); }
}
