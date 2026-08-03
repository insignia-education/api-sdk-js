/**
 * TOTP two-factor management for the authenticated user.
 * The login-time verification step lives on Auth.twoFactor().
 */
export default class TwoFactor {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** { enabled: boolean } */
    status()        { return this.#client.get('/2fa/status'); }
    /** Provision a secret (2FA stays OFF). Returns { secret, otpauth_url } for the QR. */
    setup()         { return this.#client.post('/2fa/setup'); }
    /** Confirm a code and turn 2FA on. data: { pin } */
    enable(data)    { return this.#client.post('/2fa/enable', data); }
    /** Verify a code and turn 2FA off. data: { pin } */
    disable(data)   { return this.#client.post('/2fa/disable', data); }
}
