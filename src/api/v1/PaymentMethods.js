export default class PaymentMethods {
    #client;

    constructor(client) {
        this.#client = client;
    }

    byCurrency(currency_id) { return this.#client.get(`/payment-methods/by-currency/${currency_id}`); }
}
