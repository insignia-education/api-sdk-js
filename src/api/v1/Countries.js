export default class Countries {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null) { return id ? this.#client.get(`/countries/${id}`) : this.#client.get('/countries'); }
}
