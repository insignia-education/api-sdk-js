export default class CompanySettings {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Admin-only: company name/address shown in email footers. */
    get() { return this.#client.get('/company-settings'); }

    /** Admin-only: update company name/address and `monthly_sales_goal` (the company target shown in the daily sales email). */
    edit(data) { return this.#client.patch('/company-settings', data); }
}
