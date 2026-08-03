export default class ShortLinks {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)  { return id ? this.#client.get(`/short-links/${id}`) : this.#client.get('/short-links'); }
    /** Short links created by the current user. */
    mine()          { return this.#client.get('/short-links/mine'); }
    create(data)    { return this.#client.put('/short-links', data); }
    edit(id, data)  { return this.#client.patch(`/short-links/${id}`, data); }
    delete(id)      { return this.#client.del(`/short-links/${id}`); }
}
