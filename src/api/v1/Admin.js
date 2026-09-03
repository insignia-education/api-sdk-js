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

    /** Claude (Anthropic) token usage/spend for a date range, plus account balance. Each half resolves `{ available: false }` (not an error) when its required config (admin key / account balance) isn't set. */
    statisticsClaudeUsage({ fromDate, toDate } = {}) {
        return this.#client.get('/admin/statistics/claude-usage', { from_date: fromDate, to_date: toDate });
    }

    /** Paginated sales-report rows for a date range, with optional course/seller/payment-method/currency filters. */
    reportsSales({ fromDate, toDate, courseId, sellerId, paymentMethodId, currencyId, page, perPage } = {}) {
        return this.#client.get('/admin/reports/sales', {
            from_date: fromDate, to_date: toDate,
            course_id: courseId, seller_id: sellerId, payment_method_id: paymentMethodId, currency_id: currencyId,
            page, per_page: perPage,
        });
    }

    /** Sellers with at least one attributed payment — options for the sales report's seller filter. */
    reportsSalesSellers() { return this.#client.get('/admin/reports/sales/sellers'); }

    /** Direct download link for the sales report (format: 'csv' | 'xlsx') — open with <a href>, not fetch (cookie-authenticated, same convention as Users.js's invoiceUrl). */
    reportsSalesExportUrl({ fromDate, toDate, courseId, sellerId, paymentMethodId, currencyId, format = 'csv' } = {}) {
        return Admin.#buildUrl(this.#client.baseUrl, '/admin/reports/sales/export', {
            from_date: fromDate, to_date: toDate,
            course_id: courseId, seller_id: sellerId, payment_method_id: paymentMethodId, currency_id: currencyId,
            format,
        });
    }

    /** Paginated completed-courses report rows for a date range, with an optional course filter. */
    reportsCompletedCourses({ fromDate, toDate, courseId, page, perPage } = {}) {
        return this.#client.get('/admin/reports/completed-courses', {
            from_date: fromDate, to_date: toDate, course_id: courseId, page, per_page: perPage,
        });
    }

    /** Direct download link for the completed-courses report (format: 'csv' | 'xlsx'). */
    reportsCompletedCoursesExportUrl({ fromDate, toDate, courseId, format = 'csv' } = {}) {
        return Admin.#buildUrl(this.#client.baseUrl, '/admin/reports/completed-courses/export', {
            from_date: fromDate, to_date: toDate, course_id: courseId, format,
        });
    }

    /** Paginated per-teacher report for a date range: hours given, sessions given, absences (substituted out) and substitutions (covered for someone else). */
    reportsTeacherStats({ fromDate, toDate, page, perPage } = {}) {
        return this.#client.get('/admin/reports/teacher-stats', {
            from_date: fromDate, to_date: toDate, page, per_page: perPage,
        });
    }

    /** Direct download link for the teacher-stats report (format: 'csv' | 'xlsx'). */
    reportsTeacherStatsExportUrl({ fromDate, toDate, format = 'csv' } = {}) {
        return Admin.#buildUrl(this.#client.baseUrl, '/admin/reports/teacher-stats/export', {
            from_date: fromDate, to_date: toDate, format,
        });
    }

    /** Direct link to a repo's CI-generated test-coverage HTML report ('api' | 'front' | 'api-sdk-js') — open with <a href>/<iframe src>, cookie-authenticated, not fetch. */
    coverageUrl(repo) {
        return `${this.#client.baseUrl}/admin/coverage/${repo}/`;
    }

    static #buildUrl(baseUrl, path, params) {
        const qs = new URLSearchParams(
            Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
        ).toString();
        return `${baseUrl}${path}${qs ? `?${qs}` : ''}`;
    }
}
