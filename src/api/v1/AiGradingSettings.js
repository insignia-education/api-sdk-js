export default class AiGradingSettings {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Admin-only: which AI provider/model quizzes:auto-grade-ai uses for open-text and audio grading. */
    get() { return this.#client.get('/ai-grading-settings'); }

    /** Admin-only: update the provider/model choices. */
    edit(data) { return this.#client.patch('/ai-grading-settings', data); }

    /** Admin-only: live model choices (each provider's own catalog, cached) plus pricing, for the settings page's dropdowns. */
    models() { return this.#client.get('/ai-grading-settings/models'); }
}
