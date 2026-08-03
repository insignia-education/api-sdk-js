export default class Telegram {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Admin-only: whether the shared Telegram account used for group creation is logged in. */
    status() { return this.#client.get('/telegram/status'); }

    /** Admin-only: starts (or continues) a QR-code login. */
    qrLogin() { return this.#client.post('/telegram/qr-login'); }
}
