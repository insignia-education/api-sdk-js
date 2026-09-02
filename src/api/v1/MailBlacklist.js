export default class MailBlacklist {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** get() / get(id) / get({ email }) — the last looks up one entry by email (or null), without fetching the whole list. */
    get(idOrParams = null) {
        if (idOrParams && typeof idOrParams === 'object') return this.#client.get('/mail-blacklist', idOrParams);
        return idOrParams ? this.#client.get(`/mail-blacklist/${idOrParams}`) : this.#client.get('/mail-blacklist');
    }
    create(data)    { return this.#client.put('/mail-blacklist', data); }
    delete(id)      { return this.#client.del(`/mail-blacklist/${id}`); }
}
