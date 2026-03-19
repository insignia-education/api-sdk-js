export default class Configs {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)  { return id ? this.#client.get(`/configs/${id}`) : this.#client.get('/configs'); }
    create(data)    { return this.#client.put('/configs', data); }
    edit(id, data)  { return this.#client.patch(`/configs/${id}`, data); }
    delete(id)      { return this.#client.del(`/configs/${id}`); }
}
