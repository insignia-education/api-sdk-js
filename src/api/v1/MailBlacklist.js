export default class MailBlacklist {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)  { return id ? this.#client.get(`/mail-blacklist/${id}`) : this.#client.get('/mail-blacklist'); }
    create(data)    { return this.#client.put('/mail-blacklist', data); }
    delete(id)      { return this.#client.del(`/mail-blacklist/${id}`); }
}
