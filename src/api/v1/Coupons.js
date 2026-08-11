export default class Coupons {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Employee/sales-only paginated + cod-searchable list when called without an id. */
    get(id = null, { search = null, page = 1, perPage = 15 } = {}) {
        if (id) return this.#client.get(`/coupons/${id}`);
        return this.#client.get('/coupons', { search, page, per_page: perPage });
    }
    create(data)    { return this.#client.put('/coupons', data); }
    edit(id, data)  { return this.#client.patch(`/coupons/${id}`, data); }
    delete(id)      { return this.#client.del(`/coupons/${id}`); }

    /** Employee/sales-only: usage stats + full redemption history for one coupon. */
    stats(id) { return this.#client.get(`/coupons/${id}/stats`); }

    /** Users explicitly granted access to redeem this coupon. */
    users(id) {
        const base = `/coupons/${id}/users`;
        const client = this.#client;
        return {
            get:    ()                 => client.get(base),
            add:    ({ email, reason }) => client.put(base, { email, reason }),
            remove: (userId)           => client.del(`${base}/${userId}`),
        };
    }
}
