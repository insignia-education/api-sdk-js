export default class AiGradingSettings {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Admin-only: which AI provider/model quizzes:auto-grade-ai uses for open-text and audio grading. */
    get() { return this.#client.get('/ai-grading-settings'); }

    /** Admin-only: update the provider/model choices. */
    edit(data) { return this.#client.patch('/ai-grading-settings', data); }
}
