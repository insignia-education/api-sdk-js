export default class Zoom {
    #client;

    constructor(client) {
        this.#client = client;
    }

    meetings() {
        return {
            get: (id = null) => id ? this.#client.get(`/zoom/meetings/${id}`) : this.#client.get('/zoom/meetings'),
        };
    }
}
