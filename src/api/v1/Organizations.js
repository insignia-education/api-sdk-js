export default class Organizations {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** No id: "my organizations" (all organizations if employee+, else only owned), paginated. */
    get(id = null, { page = 1, perPage = 15 } = {}) {
        return id
            ? this.#client.get(`/organizations/${id}`)
            : this.#client.get('/organizations', { page, per_page: perPage });
    }
    /** Organization-and-above (owner creates their own org; employee-and-above may pass user_id to set another owner). */
    create(data)    { return this.#client.put('/organizations', data); }
    /** user_id (owner reassignment) is applied only when the caller is employee-and-above. */
    edit(id, data)  { return this.#client.patch(`/organizations/${id}`, data); }

    /** Confirms a pending member invite from the emailed link — logs the user in on success. */
    confirmInvite(id, { username, hash }) { return this.#client.post(`/organizations/${id}/members/invite/confirm`, { username, hash }); }

    members(id) {
        const base = `/organizations/${id}/members`;
        const client = this.#client;
        return {
            get:     ()       => client.get(base),
            courses: (userId) => client.get(`${base}/${userId}/courses`),
            /** Users matching `q` not already invited/members — for the invite search box. */
            search:  (q)      => client.get(`${base}/search`, { q }),
            /** Creates a pending invite and emails the user a confirm link. */
            invite:  (userId) => client.post(`${base}/invite`, { user_id: userId }),
            /** Re-sends the invite email to a still-pending member with a fresh link. */
            resendInvite: (userId) => client.post(`${base}/${userId}/resend-invite`),
            /** Creates a real UserPayment for this member — same payload shape as users(id).payments().create(). */
            createPayment: (userId, data) => client.put(`${base}/${userId}/payments`, data),
        };
    }
}
