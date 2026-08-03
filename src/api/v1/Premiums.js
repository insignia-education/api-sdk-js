export default class Premiums {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Every premium across all courses — used to populate admin selects. */
    get() {
        return this.#client.get('/premiums');
    }
}
