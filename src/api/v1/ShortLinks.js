export default class ShortLinks {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)  { return id ? this.#client.get(`/short-links/${id}`) : this.#client.get('/short-links'); }
    create(data)    { return this.#client.put('/short-links', data); }
    edit(id, data)  { return this.#client.patch(`/short-links/${id}`, data); }
    delete(id)      { return this.#client.del(`/short-links/${id}`); }
}
