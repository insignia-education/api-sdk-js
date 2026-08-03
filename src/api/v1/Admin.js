export default class Admin {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Paginated list of courses with their currently-active course_dates. */
    courseDates({ page, perPage } = {}) {
        return this.#client.get('/admin/courses/current-dates', { page, per_page: perPage });
    }
}
