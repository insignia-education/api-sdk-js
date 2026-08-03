export default class ContactForms {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)      { return id ? this.#client.get(`/contact-forms/${id}`) : this.#client.get('/contact-forms'); }
    create(data)        { return this.#client.put('/contact-forms', data); }
    answer(id, data)    { return this.#client.post(`/contact-forms/${id}/answer`, data); }
    delete(id)          { return this.#client.del(`/contact-forms/${id}`); }
}
