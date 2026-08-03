/**
 * WebAuthn — security keys / passkeys.
 *
 * Enrollment (authenticated): registerOptions() -> register().
 * Passwordless login (public): loginOptions() -> loginVerify().
 *
 * The `credential` passed to register()/loginVerify() is the JSON produced by
 * the browser ceremony (navigator.credentials.create/get, serialized).
 */
export default class Webauthn {
    #client;

    constructor(client) {
        this.#client = client;
    }

    // Enrollment
    registerOptions()         { return this.#client.post('/webauthn/register/options'); }
    register(credential, name = null) { return this.#client.post('/webauthn/register', { credential, name }); }
    credentials()             { return this.#client.get('/webauthn/credentials'); }
    deleteCredential(id)      { return this.#client.del(`/webauthn/credentials/${id}`); }

    // Passwordless login. Pass { email } to scope to a user, or nothing for a
    // usernameless discoverable-passkey login.
    loginOptions(data = {})   { return this.#client.post('/auth/webauthn/login/options', data); }
    loginVerify(credential)   { return this.#client.post('/auth/webauthn/login', { credential }); }

    /**
     * Step-up confirmation for an already-logged-in user (e.g. approving a
     * payment with a security key instead of password + captcha). No verify
     * method here — embed the resulting credential as `webauthn_credential`
     * in the sensitive action's own request.
     */
    confirmOptions()          { return this.#client.post('/webauthn/confirm/options'); }
}
