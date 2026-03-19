export default class Auth {
    #client;

    constructor(client) {
        this.#client = client;
    }

    loginOrRegister(email)      { return this.#client.get(`/auth/login-register-check?email=${encodeURIComponent(email)}`); }
    register(data)              { return this.#client.put('/auth/register', data); }
    login(data)                 { return this.#client.post('/auth/login', data); }
    googleLogin(data)           { return this.#client.post('/auth/google', data); }
    refresh()                   { return this.#client.post('/auth/refresh'); }
    logout()                    { return this.#client.post('/auth/logout'); }
    user()                      { return this.#client.get('/auth/user'); }
}
