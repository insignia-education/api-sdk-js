// Read-only — hashes (password-reset/verify/phantom-login tokens etc.) are
// created and deleted exclusively by their owning flows (forgot-password,
// email-verify, admin phantom-login), never through a generic public API.
export default class Hashes {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)   { return id ? this.#client.get(`/hashes/${id}`) : this.#client.get('/hashes'); }
}
