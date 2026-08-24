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
            /** Already-graded quiz submissions from one CourseDate's own students, optionally narrowed to one quiz. */
            courseDateGradedQuizzes: (courseDateId, quizId = null) => this.#client.get(`${base}/course-dates/${courseDateId}/quizzes/graded`, quizId ? { quiz_id: quizId } : {}),
            /** Distinct { id, title } quizzes needing correction under this CourseDate's course — for the graded-tab quiz filter. */
            courseDateCorrectableQuizzes: (courseDateId) => this.#client.get(`${base}/course-dates/${courseDateId}/quizzes/correctable`),
            /** Ungraded quiz submissions grouped by course, for every course this teacher teaches. hasCertificate (true/false) narrows to courses with/without Course.certificate_exam_enabled; omit for every course. */
            ungradedQuizzes: (hasCertificate = null) => this.#client.get(`${base}/quizzes/ungraded`, hasCertificate === null ? {} : { has_certificate: hasCertificate ? 1 : 0 }),
            /** Ungraded quiz submissions for one course (any student, not just one CourseDate's) — for courses with no cohort scheduling, e.g. placement exams. */
            courseUngradedQuizzes: (courseId) => this.#client.get(`${base}/courses/${courseId}/quizzes/ungraded`),
            /** Already-graded quiz submissions for one course, optionally narrowed to one quiz. */
            courseGradedQuizzes: (courseId, quizId = null) => this.#client.get(`${base}/courses/${courseId}/quizzes/graded`, quizId ? { quiz_id: quizId } : {}),
            /** Distinct { id, title } quizzes needing correction under this course — for the graded-tab quiz filter. */
            courseCorrectableQuizzes: (courseId) => this.#client.get(`${base}/courses/${courseId}/quizzes/correctable`),
            /** Full attempt detail (all score fields, answers, quiz.questions.answers eager-loaded) for one of this teacher's own students. */
            quizDetail: (id) => this.#client.get(`${base}/quizzes/${id}`),
            /**
             * Grade (or partially grade) an attempt: any field omitted keeps its current value, so open/audio/session
             * can be saved independently of finalizing (teacher_graded_at). `data` may include:
             * `open_grades` ({question_id: bool}, replaces score_open — server sums each correct question's own
             * point value), `score_audio`, `score_session_percentage`, `teacher_graded_at`,
             * `comments_positive`/`comments_negative`/`comments_general` (only saved if the quiz's matching
             * comment_*_enabled flag is on), `course_selected` (only saved if course_as_comment_enabled).
             */
            gradeQuiz: (id, data) => this.#client.patch(`${base}/quizzes/${id}/grade`, data),
            /** Mark one student's attendance (present: true/false) on one of this teacher's own sessions. */
            markAttendance: (sessionId, studentId, present) => this.#client.patch(`${base}/sessions/${sessionId}/attendance`, { student_id: studentId, present }),
            /** Mark the teacher's own presence (present: true/false) on one of their own sessions. */
            markTeacherPresent: (sessionId, present) => this.#client.patch(`${base}/sessions/${sessionId}/teacher-present`, { present }),
            /** Attendance/substitution totals. Pass { from, to } (YYYY-MM-DD) to filter, omit for all-time. */
            stats: ({ from, to } = {}) => this.#client.get(`${base}/stats`, { from, to }),
            /** Pay owed for sessions taught (teacher_present = 1), per course. Pass { from, to } (YYYY-MM-DD) to filter, omit for all-time. */
            earnings: ({ from, to } = {}) => this.#client.get(`${base}/earnings`, { from, to }),
        };
    }
}
