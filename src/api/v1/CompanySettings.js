export default class CompanySettings {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Admin-only: company name/address shown in email footers. */
    get() { return this.#client.get('/company-settings'); }

    /** Admin-only: update company name/address. */
    edit(data) { return this.#client.patch('/company-settings', data); }
}
