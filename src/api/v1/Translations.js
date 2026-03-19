export default class Translations {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)       { return id ? this.#client.get(`/translations/${id}`) : this.#client.get('/translations'); }
    create(data)         { return this.#client.put('/translations', data); }
    delete(id)           { return this.#client.del(`/translations/${id}`); }
    editText(id, data)   { return this.#client.patch(`/translations/${id}/text`, data); }
}
