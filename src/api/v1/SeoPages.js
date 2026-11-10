export default class SeoPages {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Public: every stored landing as { [lang]: { [path]: seo } }. */
    get() { return this.#client.get('/seo-pages'); }

    /** Admin-only: upsert the SEO values of one landing path in one language ({ path, lang, seo }); empty seo resets it to the site defaults. */
    save(data) { return this.#client.put('/seo-pages', data); }
}
