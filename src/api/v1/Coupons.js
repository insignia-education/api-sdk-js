export default class Coupons {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)  { return id ? this.#client.get(`/coupons/${id}`) : this.#client.get('/coupons'); }
    create(data)    { return this.#client.put('/coupons', data); }
    edit(id, data)  { return this.#client.patch(`/coupons/${id}`, data); }
    delete(id)      { return this.#client.del(`/coupons/${id}`); }
}
