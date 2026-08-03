export default class Dashboard {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Which dashboard modules the current user should see: { teacher, education_center, organization }. */
    modules() { return this.#client.get('/dashboard/modules'); }
}
