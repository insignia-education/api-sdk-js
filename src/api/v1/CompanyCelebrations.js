export default class CompanyCelebrations {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Admin-only: a year of celebratory media, one entry per month (`{ month, media: { url, kind }[] }[]`, empty `media` where unset). */
    get(year = new Date().getFullYear()) { return this.#client.get('/company-celebrations', { year }); }

    /** Admin-only: replaces one month's media list (`kind` is `image` or `video`; `[]` clears it); resolves the full year. */
    edit(year, month, media) { return this.#client.put('/company-celebrations', { year, month, media }); }

    /** Sellers-and-above: the celebration to show right now — `{ active, year, month, media }`, `active` only in the month's first week. */
    current() { return this.#client.get('/sales/celebration'); }
}
