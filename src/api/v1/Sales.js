export default class Sales {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Options for the UTM link generator: courses, session types, active coupons, known utm source/medium/campaign values. */
    utmGeneratorOptions() { return this.#client.get('/sales/utm-generator/options'); }

    /** Counts + amount totals for the current seller's own payments, by status (pending/approved/rejected). */
    myStats() { return this.#client.get('/sales/my-stats'); }

    /** Paginated list of the current seller's own attributed payments. */
    mySales({ page, perPage } = {}) {
        return this.#client.get('/sales/my-sales', { page, per_page: perPage });
    }

    /** Paginated list of the current seller's clients — users whose `seller_id` is the seller (`id, name, username, email, phone, created_at`). Optional `q` filters by name/username/email/phone. */
    myClients({ page, perPage, q } = {}) {
        return this.#client.get('/sales/my-clients', { page, per_page: perPage, q });
    }

    /** Sellers and above: users with all 3 KYC files uploaded but not yet verified. */
    kycPending() { return this.#client.get('/sales/kyc-pending'); }

    /** Course dates starting within the current calendar week (Mon–Sun). */
    coursesStartingThisWeek() { return this.#client.get('/sales/courses/starting-this-week'); }

    /**
     * Read-only course-date views for the Sales "Course dates" tab — same payloads as the matching
     * Employee.dashboard() methods, minus every write action (ranking, attendance, grading, teacher changes).
     */
    courseDates() {
        const base = '/sales/course-dates';
        return {
            /** All sessions of a course date, each with its student roster ({id, name, email, username, present}). */
            sessions: (courseDateId) => this.#client.get(`${base}/${courseDateId}/sessions`),
            /** Ranked roster ({id, name, email, username, rank}). */
            students: (courseDateId) => this.#client.get(`${base}/${courseDateId}/students`),
            /** Per-student progress keyed by student id (quiz_progress, level_exams, next_course). */
            studentOverviews: (courseDateId) => this.#client.get(`${base}/${courseDateId}/students/overview`),
            /** One enrolled student's quiz attempts in the course date's course. */
            studentQuizzes: (courseDateId, studentId) => this.#client.get(`${base}/${courseDateId}/students/${studentId}/quizzes`),
        };
    }
}
