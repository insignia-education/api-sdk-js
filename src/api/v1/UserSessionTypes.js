export default class UserSessionTypes {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get() { return this.#client.get('/user-session-types'); }
}
