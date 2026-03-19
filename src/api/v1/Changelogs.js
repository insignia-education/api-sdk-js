export default class Changelogs {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)       { return id ? this.#client.get(`/changelogs/${id}`) : this.#client.get('/changelogs'); }
    approve(id)          { return this.#client.post(`/changelogs/${id}/approve`); }
    reject(id, data)     { return this.#client.post(`/changelogs/${id}/reject`, data); }
}
