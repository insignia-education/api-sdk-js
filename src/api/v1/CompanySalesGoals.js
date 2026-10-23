export default class CompanySalesGoals {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Admin-only: the company's 12 monthly sales goals for a year (`{ month, amount }[]`, 0 where unset). */
    get(year = new Date().getFullYear()) { return this.#client.get('/company-sales-goals', { year }); }

    /** Admin-only: upserts the given months of a year's company sales goals; resolves the full 12-month list. */
    edit(year, goals) { return this.#client.put('/company-sales-goals', { year, goals }); }
}
