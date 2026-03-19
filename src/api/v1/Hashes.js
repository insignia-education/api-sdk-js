export default class Hashes {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)   { return id ? this.#client.get(`/hashes/${id}`) : this.#client.get('/hashes'); }
    generate(data)   { return this.#client.put('/hashes/generate', data); }
    delete(id)       { return this.#client.del(`/hashes/${id}`); }
}
