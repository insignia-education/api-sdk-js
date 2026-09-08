/** Sales-and-above: IP blocks (the blocks table — ip-scoped only, see App\Models\Block). */
export default class Blocks {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** `id` fetches one block; omitted fetches the paginated list — `{ page, perPage }` control that page. */
    get(id = null, { page, perPage } = {}) {
        return id ? this.#client.get(`/blocks/${id}`) : this.#client.get('/blocks', { page, per_page: perPage });
    }
    create(data)     { return this.#client.put('/blocks', data); }
    edit(id, data)   { return this.#client.patch(`/blocks/${id}`, data); }
    delete(id)       { return this.#client.del(`/blocks/${id}`); }
}
