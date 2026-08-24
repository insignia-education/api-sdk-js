export default class Auth {
    #client;

    constructor(client) {
        this.#client = client;
    }

    loginOrRegister(email, captcha_token) { return this.#client.get(`/auth/login-register-check?email=${encodeURIComponent(email)}&captcha_token=${encodeURIComponent(captcha_token)}`); }
    register(data)              { return this.#client.put('/auth/register', data); }
    /** May resolve to { two_factor_required: true } — then call twoFactor({ pin }). */
    login(data)                 { return this.#client.post('/auth/login', data); }
    googleLogin(data)           { return this.#client.post('/auth/google', data); }
    refresh()                   { return this.#client.post('/auth/refresh'); }
    logout()                    { return this.#client.post('/auth/logout'); }
    user()                      { return this.#client.get('/auth/user'); }
    forgotPassword(email, captcha_token) { return this.#client.post('/auth/forgot-password', { email, captcha_token }); }
    resetPassword(data)         { return this.#client.post('/auth/reset-password', data); }
    magicLinkSend(email)        { return this.#client.post('/auth/magic-link/send', { email }); }
    magicLinkVerify(data)       { return this.#client.post('/auth/magic-link/verify', data); }
    facebookLogin(data)         { return this.#client.post('/auth/facebook', data); }
    emailVerify(data)           { return this.#client.post('/auth/email-verify', data); }
    /** Second login step when two_factor_required: exchange { pin } for a session. */
    twoFactor(data)             { return this.#client.post('/auth/2fa', data); }
    /** GDPR Art. 8 — clicked by the guardian from the consent email, not the account holder; no session is created. */
    guardianConsentConfirm(hash) { return this.#client.post(`/guardian-consent/${hash}`); }
    /** GDPR Art. 8 — a blocked minor (user.guardian_consent_required) submits their guardian's
     *  email from the dashboard gate; exempted from the guardian-consent block server-side so
     *  it's reachable even while everything else 403s. */
    submitGuardianEmail(email)  { return this.#client.post('/auth/guardian-email', { email }); }
}
