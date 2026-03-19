export default class UserTypes {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)  { return id ? this.#client.get(`/user-types/${id}`) : this.#client.get('/user-types'); }
    create(data)    { return this.#client.put('/user-types', data); }
    edit(id, data)  { return this.#client.patch(`/user-types/${id}`, data); }
    delete(id)      { return this.#client.del(`/user-types/${id}`); }
}
