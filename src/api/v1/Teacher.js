export default class Teacher {
    #client;

    constructor(client) {
        this.#client = client;
    }

    absences() {
        const base = '/teacher/absences';
        return {
            get:    (id = null) => id ? this.#client.get(`${base}/${id}`) : this.#client.get(base),
            create: (data)      => this.#client.put(base, data),
            edit:   (id, data)  => this.#client.patch(`${base}/${id}`, data),
            delete: (id)        => this.#client.del(`${base}/${id}`),
        };
    }

    configSets() {
        const base = '/teacher/config-sets';
        return {
            /** get() / get(id) / get({ user_id }) — the last filters the list to one teacher's sets. */
            get:    (idOrParams = null) => {
                if (idOrParams && typeof idOrParams === 'object') return this.#client.get(base, idOrParams);
                return idOrParams ? this.#client.get(`${base}/${idOrParams}`) : this.#client.get(base);
            },
            create: (data)      => this.#client.put(base, data),
            edit:   (id, data)  => this.#client.patch(`${base}/${id}`, data),
            delete: (id)        => this.#client.del(`${base}/${id}`),
        };
    }

    configs() {
        const base = '/teacher/configs';
        return {
            /** get() / get(id) / get({ config_set_id }) — the last filters the list to one config set. */
            get:    (idOrParams = null) => {
                if (idOrParams && typeof idOrParams === 'object') return this.#client.get(base, idOrParams);
                return idOrParams ? this.#client.get(`${base}/${idOrParams}`) : this.#client.get(base);
            },
            create: (data)      => this.#client.put(base, data),
            edit:   (id, data)  => this.#client.patch(`${base}/${id}`, data),
            delete: (id)        => this.#client.del(`${base}/${id}`),
        };
    }

    dashboard() {
        const base = '/teacher/dashboard';
        return {
            /** Own scheduled sessions for a given date (YYYY-MM-DD), each with a `students` roster ({id, name, present}). */
            sessions: (date) => this.#client.get(`${base}/sessions`, { date }),
            /** Every CourseDate this teacher is assigned to. */
            courseDates: () => this.#client.get(`${base}/course-dates`),
            /** All sessions for one CourseDate, each with a `students` roster ({id, name, present}). */
            courseDateSessions: (courseDateId) => this.#client.get(`${base}/course-dates/${courseDateId}/sessions`),
            /** { url, pending } — the zip archive of this group's course materials, or pending:true while it's (re)building. */
            courseDateContentDownload: (courseDateId) => this.#client.get(`${base}/course-dates/${courseDateId}/content-download`),
            /** Ungraded quiz submissions from one CourseDate's own students. */
            courseDateUngradedQuizzes: (courseDateId) => this.#client.get(`${base}/course-dates/${courseDateId}/quizzes/ungraded`),
            /** Ungraded quiz submissions grouped by course, for every course this teacher teaches. */
            ungradedQuizzes: () => this.#client.get(`${base}/quizzes/ungraded`),
            /** Mark one student's attendance (present: true/false) on one of this teacher's own sessions. */
            markAttendance: (sessionId, studentId, present) => this.#client.patch(`${base}/sessions/${sessionId}/attendance`, { student_id: studentId, present }),
            /** Attendance/substitution totals. Pass { from, to } (YYYY-MM-DD) to filter, omit for all-time. */
            stats: ({ from, to } = {}) => this.#client.get(`${base}/stats`, { from, to }),
            /** Pay owed for sessions taught (teacher_present = 1), per course. Pass { from, to } (YYYY-MM-DD) to filter, omit for all-time. */
            earnings: ({ from, to } = {}) => this.#client.get(`${base}/earnings`, { from, to }),
        };
    }
}
