export default class Categories {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)  { return id ? this.#client.get(`/categories/${id}`) : this.#client.get('/categories'); }
    create(data)    { return this.#client.put('/categories', data); }
    edit(id, data)  { return this.#client.patch(`/categories/${id}`, data); }
    delete(id)      { return this.#client.del(`/categories/${id}`); }
}
