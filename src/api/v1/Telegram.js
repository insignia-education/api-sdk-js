export default class Telegram {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Admin-only: whether the shared Telegram account used for group creation is logged in. */
    status() { return this.#client.get('/telegram/status'); }

    /** Admin-only: starts (or continues) a QR-code login. May return { needs_password: true } if the account has 2FA — call password() next. */
    qrLogin() { return this.#client.post('/telegram/qr-login'); }

    /** Admin-only: completes a QR login that's waiting on the account's cloud (2FA) password. */
    password(password) { return this.#client.post('/telegram/password', { password }); }

    /** Admin-only: current webhook registration for the main bot (account linking + notifications). */
    webhookStatus() { return this.#client.get('/telegram/webhook'); }

    /** Admin-only: (re)registers this API's /webhooks/telegram endpoint with Telegram. Idempotent. */
    setWebhook() { return this.#client.post('/telegram/webhook'); }
}
