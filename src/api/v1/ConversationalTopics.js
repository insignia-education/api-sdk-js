export default class ConversationalTopics {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)  { return id ? this.#client.get(`/conversational-topics/${id}`) : this.#client.get('/conversational-topics'); }
    create(data)    { return this.#client.put('/conversational-topics', data); }
    edit(id, data)  { return this.#client.patch(`/conversational-topics/${id}`, data); }
    delete(id)      { return this.#client.del(`/conversational-topics/${id}`); }
}
