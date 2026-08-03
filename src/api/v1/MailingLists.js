export default class MailingLists {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)   { return id ? this.#client.get(`/mailing-lists/${id}`) : this.#client.get('/mailing-lists'); }
    create(data)     { return this.#client.put('/mailing-lists', data); }
    delete(id)       { return this.#client.del(`/mailing-lists/${id}`); }
    preview(filters) { return this.#client.post('/mailing-lists/preview', { filters }); }
    send(data)       { return this.#client.post('/mailing-lists/send', data); }
    sent()           { return this.#client.get('/mailing-lists/sent'); }
}
