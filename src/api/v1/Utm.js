export default class Utm {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /**
     * Records a utm_source/utm_medium/utm_campaign/utm_term/utm_content capture
     * for the authenticated user. Call once when utm_* params are detected in
     * the page URL, then strip them from the URL to avoid re-sending on reload.
     */
    capture({ source = null, medium = null, campaign = null, term = null, content = null } = {}) {
        return this.#client.post('/utm/capture', {
            utm_source: source,
            utm_medium: medium,
            utm_campaign: campaign,
            utm_term: term,
            utm_content: content,
        });
    }
}
