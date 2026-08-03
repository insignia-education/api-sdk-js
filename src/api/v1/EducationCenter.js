export default class EducationCenter {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Per-course stats (enrolled count, completion rate, revenue) for courses owned by the current user. */
    coursesStats() { return this.#client.get('/education-center/courses/stats'); }
}
