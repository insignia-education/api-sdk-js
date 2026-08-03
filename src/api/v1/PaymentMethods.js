export default class PaymentMethods {
    #client;

    constructor(client) {
        this.#client = client;
    }

    byCurrency(currency_id) { return this.#client.get(`/payment-methods/by-currency/${currency_id}`); }

    /** All payment methods, unscoped by currency — used by the admin Offer form's payment-method select. */
    getAll() { return this.#client.get('/payment-methods'); }
}
