export default class Courses {
    #client;

    constructor(client) {
        this.#client = client;
    }

    getByCod(cod) { return this.#client.get(`/courses/cod/${cod}`); }

    get(id = null, { page = 1, perPage = 15 } = {}) {
        if (id) return this.#client.get(`/courses/${id}`);
        const params = new URLSearchParams();
        if (page)    params.set('page', page);
        if (perPage) params.set('per_page', perPage);
        const qs = params.toString();
        return this.#client.get(qs ? `/courses?${qs}` : '/courses');
    }

    /** Fetch all courses in a single unpaginated request (per_page=0). */
    getAll() {
        return this.#client.get('/courses?per_page=0');
    }
    create(data)    { return this.#client.put('/courses', data); }
    edit(id, data)  { return this.#client.patch(`/courses/${id}`, data); }
    delete(id)      { return this.#client.del(`/courses/${id}`); }

    /** Users enrolled on this course as a teacher (user_courses.teacher = 1). */
    teachers(courseId) { return this.#client.get(`/courses/${courseId}/teachers`); }

    /** Customer-facing session-credit pricing (no commission fields) for self-checkout. */
    sessionsPricing(courseId) { return this.#client.get(`/courses/${courseId}/sessions/pricing`); }

    dates(courseId) {
        const base = `/courses/${courseId}/dates`;
        return {
            get:    (id = null) => id ? this.#client.get(`${base}/${id}`) : this.#client.get(base),
            /** Public dates list with enrollment counts, for the public course page. */
            getPublic: () => this.#client.get(`${base}/public`),
            create: (data)      => this.#client.put(base, data),
            edit:   (id, data)  => this.#client.patch(`${base}/${id}`, data),
            delete: (id)        => this.#client.del(`${base}/${id}`),
            /** Create (or reuse) a Telegram group for this date. */
            createTelegramGroup: (id) => this.#client.post(`${base}/${id}/telegram-group`),
            /** Re-copy this date's telegram_link/telegram_id onto every UserCourse assigned to it. */
            syncTelegramToUsers: (id) => this.#client.post(`${base}/${id}/sync-user-courses`),
            /** Reconciles this date's sessions with its current teacher/config set: creates missing ones, reassigns the teacher on existing ones, deletes untouched ones that no longer match the schedule. Safe to re-run any time the config, date range or teacher changes. */
            syncSessions: (id) => this.#client.post(`${base}/${id}/sync-sessions`),
            /** Reconciles per-student attendance rows for this date's generated sessions against who's currently enrolled (UserCourse). Safe to re-run any time the roster changes. */
            syncAttendances: (id) => this.#client.post(`${base}/${id}/sync-attendances`),
            /** Sessions already generated for this date. */
            sessions: (id) => this.#client.get(`${base}/${id}/sessions`),
            /** Create a Zoom meeting for one of this date's generated sessions. */
            generateZoomMeeting: (id, sessionId) => this.#client.post(`${base}/${id}/sessions/${sessionId}/zoom-meeting`),
            /** Create a Zoom meeting for every session in this date that doesn't have one yet. */
            generateZoomMeetings: (id) => this.#client.post(`${base}/${id}/sessions/zoom-meetings`),
        };
    }

    sessions(courseId) {
        const base = `/courses/${courseId}/sessions`;
        return {
            get:    (id = null) => id ? this.#client.get(`${base}/${id}`) : this.#client.get(base),
            create: (data)      => this.#client.put(base, data),
            edit:   (id, data)  => this.#client.patch(`${base}/${id}`, data),
            delete: (id)        => this.#client.del(`${base}/${id}`),
        };
    }

    premiums(courseId) {
        const client = this.#client;
        const base = `/courses/${courseId}/premiums`;
        return {
            get:    (id = null) => id ? client.get(`${base}/${id}`) : client.get(base),
            /** Public premiums list with items, for the public course page. */
            getPublic: () => client.get(`${base}/public`),
            create: (data)      => client.put(base, data),
            edit:   (id, data)  => client.patch(`${base}/${id}`, data),
            delete: (id)        => client.del(`${base}/${id}`),
            items:  (premiumId) => {
                const iBase = `${base}/${premiumId}/items`;
                return {
                    get:    (id = null) => id ? client.get(`${iBase}/${id}`) : client.get(iBase),
                    create: (data)      => client.put(iBase, data),
                    edit:   (id, data)  => client.patch(`${iBase}/${id}`, data),
                    delete: (id)        => client.del(`${iBase}/${id}`),
                };
            },
        };
    }

    levels(courseId) {
        const client = this.#client;
        const base = `/courses/${courseId}/levels`;
        return {
            get:    (id = null) => id ? client.get(`${base}/${id}`) : client.get(base),
            create: (data)      => client.put(base, data),
            edit:   (id, data)  => client.patch(`${base}/${id}`, data),
            delete: (id)        => client.del(`${base}/${id}`),
            lessons: (levelId) => {
                const lBase = `${base}/${levelId}/lessons`;
                return {
                    get:    (id = null) => id ? client.get(`${lBase}/${id}`) : client.get(lBase),
                    create: (data)      => client.put(lBase, data),
                    edit:   (id, data)  => client.patch(`${lBase}/${id}`, data),
                    delete: (id)        => client.del(`${lBase}/${id}`),
                    materials: (lessonId) => {
                        const mBase = `${lBase}/${lessonId}/materials`;
                        return {
                            get:    (id = null) => id ? client.get(`${mBase}/${id}`) : client.get(mBase),
                            create: (data)      => client.put(mBase, data),
                            edit:   (id, data)  => client.patch(`${mBase}/${id}`, data),
                            delete: (id)        => client.del(`${mBase}/${id}`),
                        };
                    },
                };
            },
        };
    }
}
