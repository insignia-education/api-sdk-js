export default class ContactTypes {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get() { return this.#client.get('/contact-types'); }
}
