export default class Search {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /**
     * Sales-and-above global search: users (name/email/dni) and courses (cod/title).
     * `offset` pages through the user results only (courses are always the first page) —
     * response includes `users_has_more` to know whether another page exists.
     */
    query(q, offset = 0) { return this.#client.get('/search', { q, offset }); }
}
