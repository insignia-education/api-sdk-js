export default class Files {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)  { return id ? this.#client.get(`/files/${id}`) : this.#client.get('/files'); }
    delete(id)      { return this.#client.del(`/files/${id}`); }
}
