export default class Currencies {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null) { return id ? this.#client.get(`/currencies/${id}`) : this.#client.get('/currencies'); }
    getValues()    { return this.#client.get('/currencies/values'); }
}
