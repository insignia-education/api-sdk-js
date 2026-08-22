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
            /** Every teacher's recurring weekly availability for individual sessions (day-of-week templates, not booked dates). */
            individualAvailability: () => this.#client.get(`${base}/teachers/individual-availability`),
            /** One teacher's Individual + Quiz session instances — the admin "teacher schedule" page's sessions tab. */
            teacherSessions: (teacherId) => this.#client.get(`${base}/teachers/${teacherId}/sessions`),
            /** Courses this teacher is assigned to teach — the admin "teacher schedule" page's per-course subtabs. */
            teacherCourses: (teacherId) => this.#client.get(`${base}/teachers/${teacherId}/courses`),
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
            /** Freeform Zoom meeting for the requesting employee (no course, no student roster). time is "HH:mm". */
            createCustomMeeting: (topic, date, time, duration) =>
                this.#client.post(`${base}/custom-meeting`, { topic, date, time, duration }),
        };
    }
}
