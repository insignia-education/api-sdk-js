export default class Employee {
    #client;

    constructor(client) {
        this.#client = client;
    }

    dashboard() {
        const base = '/employee/dashboard';
        return {
            /** All teachers' sessions for a given date (YYYY-MM-DD). */
            sessions: (date) => this.#client.get(`${base}/sessions`, { date }),
            /** All teachers' individual sessions for the 7-day window starting at `start` (YYYY-MM-DD, Monday). */
            weekSessions: (start) => this.#client.get(`${base}/sessions/week`, { start }),
            /** All sessions for one course_date, any teacher. */
            courseDateSessions: (courseDateId) => this.#client.get(`${base}/course-dates/${courseDateId}/sessions`),
            /** Mark a student's attendance on any teacher's session. */
            markAttendance: (sessionId, studentId, present) =>
                this.#client.patch(`${base}/sessions/${sessionId}/attendance`, { student_id: studentId, present }),
            /** Mark whether the assigned teacher showed up to a session. */
            markTeacherPresent: (sessionId, present) =>
                this.#client.patch(`${base}/sessions/${sessionId}/teacher-present`, { present }),
            /** Reassign a single session's teacher (not the whole course_date — that's a course-config action). */
            changeSessionTeacher: (sessionId, teacherId) =>
                this.#client.patch(`${base}/sessions/${sessionId}/teacher`, { teacher_id: teacherId }),
        };
    }
}
