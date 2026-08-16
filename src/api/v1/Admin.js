export default class Admin {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Paginated list of courses with their currently-active course_dates. */
    courseDates({ page, perPage } = {}) {
        return this.#client.get('/admin/courses/current-dates', { page, per_page: perPage });
    }

    /** Date-range sales report: totals by status (pending/approved/rejected), and the same split by course, payment method and currency. */
    statisticsSales({ fromDate, toDate } = {}) {
        return this.#client.get('/admin/statistics/sales', { from_date: fromDate, to_date: toDate });
    }
}
