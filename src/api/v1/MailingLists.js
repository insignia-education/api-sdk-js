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
    /** Direct download link for the audience matching `filters` (format: 'csv' | 'xlsx') — open with <a href>, not fetch (cookie-authenticated, same convention as Admin.js's export URLs). */
    exportUrl(filters, format = 'csv') {
        const qs = new URLSearchParams({ filters: JSON.stringify(filters), format }).toString();
        return `${this.#client.baseUrl}/mailing-lists/export?${qs}`;
    }
    sent()           { return this.#client.get('/mailing-lists/sent'); }
}
