export default class Analytics {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /**
     * Public, cookie-less visit log: call on every landing/route change, BEFORE and regardless of the
     * cookie-consent decision. `landingId` is a random UUID the front keeps in memory only (never in
     * storage) so the later `consent()` call can be matched to this visit. No user is attached, even if
     * the caller is logged in.
     */
    view({ landingId, source, path, title = null, referrer = null, utm = {}, language = null, screenWidth = null, screenHeight = null } = {}) {
        return this.#client.post('/analytics/views', {
            landing_id: landingId,
            source, // "dashboard" | "site"
            path,
            title,
            referrer,
            utm_source: utm.source ?? null,
            utm_medium: utm.medium ?? null,
            utm_campaign: utm.campaign ?? null,
            utm_term: utm.term ?? null,
            utm_content: utm.content ?? null,
            language,
            screen_width: screenWidth,
            screen_height: screenHeight,
        });
    }

    /**
     * The cookie-consent decision for a landing (also send it for a returning visitor whose stored
     * decision applies to this landing). `consent`: "accepted" | "rejected".
     */
    consent({ landingId, source, consent, path = null, language = null } = {}) {
        return this.#client.post('/analytics/consents', {
            landing_id: landingId,
            source,
            consent,
            path,
            language,
        });
    }
}
