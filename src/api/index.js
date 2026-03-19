import InsigniaClient from "../Client";
import InsigniaApiV1 from "./v1";


export default class InsigniaApi {
    #client;

    constructor(baseUrl = null, token = null) {
        baseUrl = baseUrl && !baseUrl.endsWith('/api') ? baseUrl.replace(/\/?$/, '/api') : baseUrl;
        this.#client = new InsigniaClient(baseUrl, token);
        this.v1 = new InsigniaApiV1(baseUrl, token);
    }

    setToken(token) {
        this.#client.setToken(token);
    }

    getToken() {
        return this.#client.getToken();
    }
}
