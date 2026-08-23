/** Admin-only: IP blocks (the blocks table — ip-scoped only, see App\Models\Block). */
export default class Blocks {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)  { return id ? this.#client.get(`/blocks/${id}`) : this.#client.get('/blocks'); }
    create(data)    { return this.#client.put('/blocks', data); }
    delete(id)      { return this.#client.del(`/blocks/${id}`); }
}
