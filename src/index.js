import InsigniaClient from "./Client";
import InsigniaApi from "./api";

 
export default class Insignia {
    #client;

    constructor(baseUrl = null, token = null) {
        this.#client = new InsigniaClient(baseUrl, token);
        this.api = new InsigniaApi(baseUrl, token);
    }

    setToken(token) {
        this.#client.setToken(token);
    }

    getToken() {
        return this.#client.getToken();
    }
}

