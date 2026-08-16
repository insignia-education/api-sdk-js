export default class Certificates {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /**
     * Public certificate verification — no auth required, safe to call from
     * the certificate-verify page or a shared link (e.g. LinkedIn's
     * "Add to Profile" certUrl). Resolves { student_name, course_title,
     * completed_at }, or rejects (err.status === 404) when there's no
     * completed enrollment for that user/course pair.
     */
    verify(userId, courseId) {
        return this.#client.get(`/certificates/verify/${userId}/${courseId}`);
    }
}
