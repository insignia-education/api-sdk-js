export default class Organizations {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)  { return id ? this.#client.get(`/organizations/${id}`) : this.#client.get('/organizations'); }
    create(data)    { return this.#client.put('/organizations', data); }
    edit(id, data)  { return this.#client.patch(`/organizations/${id}`, data); }
}
