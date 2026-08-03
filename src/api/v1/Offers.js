export default class Offers {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Sales-only paginated + title-searchable list when called without an id. */
    get(id = null, { search = null, page = 1, perPage = 15 } = {}) {
        if (id) return this.#client.get(`/offers/${id}`);
        return this.#client.get('/offers', { search, page, per_page: perPage });
    }
    create(data)    { return this.#client.put('/offers', data); }
    edit(id, data)  { return this.#client.patch(`/offers/${id}`, data); }
    delete(id)      { return this.#client.del(`/offers/${id}`); }

    /** Sales-only: usage stats + full redemption history for one offer. */
    stats(id) { return this.#client.get(`/offers/${id}/stats`); }
}
