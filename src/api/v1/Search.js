export default class Search {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Sales-and-above global search: users (name/email/dni) and courses (cod/title). */
    query(q) { return this.#client.get('/search', { q }); }
}
