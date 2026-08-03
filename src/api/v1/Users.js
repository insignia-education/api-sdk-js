export default class Users {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)            { return id ? this.#client.get(`/users/${id}`) : this.#client.get('/users'); }
    getByUsername(username)   { return this.#client.get(`/users/username/${username}`); }
    findByUsername(username)  { return this.#client.get(`/users/find/${username}`); }
    cashReceivers()           { return this.#client.get('/users/cash-receivers'); }
    /** Seller-type users, for the payment forms' Seller picker (checkout + admin payment create/edit). */
    sellers()                 { return this.#client.get('/users/sellers'); }
    /** Employee-only: users assignable as a course owner (super-admins, education centers, organizations). */
    assignable()              { return this.#client.get('/users/assignable'); }
    /** Employee-only: users assignable as a course teacher (super-admins, admins, employees, teachers). */
    assignableTeachers()      { return this.#client.get('/users/assignable-teachers'); }
    /** Employee-only: paginated list of teacher-type users, for the admin Teachers view. */
    teachers({ page = 1, perPage = 15 } = {}) {
        return this.#client.get('/users/teachers', { page, per_page: perPage });
    }
    /** Employee-only: users eligible to own/reassign an organization (organization-and-above). */
    organizationOwners()      { return this.#client.get('/users/organization-owners'); }
    edit(id, data)  { return this.#client.patch(`/users/${id}`, data); }

    #nested(userId, path) {
        const base = `/users/${userId}/${path}`;
        const client = this.#client;
        return {
            get:    (id = null) => id ? client.get(`${base}/${id}`) : client.get(base),
            create: (data)      => client.put(base, data),
            edit:   (id, data)  => client.patch(`${base}/${id}`, data),
            delete: (id)        => client.del(`${base}/${id}`),
        };
    }

    courses(userId) {
        const base   = `/users/${userId}/courses`;
        const client = this.#client;
        return {
            get:    (id = null) => id ? client.get(`${base}/${id}`) : client.get(base),
            create: (data)      => client.put(base, data),
            edit:   (id, data)  => client.patch(`${base}/${id}`, data),
            delete: (id)        => client.del(`${base}/${id}`),
            /** Submit the four-dimension completion survey (0–5 each). */
            survey: (id, data)  => client.patch(`${base}/${id}/survey`, data),
        };
    }
    courseNotes(userId)    { return this.#nested(userId, 'course-notes'); }
    quizzes(userId)        { return this.#nested(userId, 'quizzes'); }
    sessions(userId)       { return this.#nested(userId, 'sessions'); }
    surveys(userId)        { return this.#nested(userId, 'surveys'); }
    cart(userId)           { return this.#nested(userId, 'cart'); }

    payments(userId) {
        const base = `/users/${userId}/payments`;
        const client = this.#client;
        return {
            get:    (id = null) => id ? client.get(`${base}/${id}`) : client.get(base),
            create: (data)      => client.put(base, data),
            edit:   (id, data)  => client.patch(`${base}/${id}`, data),
            delete: (id)        => client.del(`${base}/${id}`),
            verify: (id, data)  => client.post(`${base}/${id}/verify`, data),
            reject: (id, data)  => client.post(`${base}/${id}/reject`, data),
            /** Preview pricing (with any auto-applied Offer) for a prospective cart, without creating a payment. */
            quote:  (data)      => client.post(`${base}/quote`, data),
            /** Creates a Stripe PaymentIntent for this cart; returns { client_secret, publishable_key, amount } to mount Stripe Elements with. */
            stripeIntent: (data) => client.post(`${base}/stripe/intent`, data),
        };
    }

    /** Read-only: points are granted/revoked by internal jobs, not over the API. */
    points(userId) {
        const base = `/users/${userId}/points`;
        const client = this.#client;
        return {
            get: (id = null) => id ? client.get(`${base}/${id}`) : client.get(base),
        };
    }

    /** Read-only: money moves are created by internal jobs, not over the API. */
    moneyMoves(userId) {
        const base = `/users/${userId}/money-moves`;
        const client = this.#client;
        return {
            get: (id = null) => id ? client.get(`${base}/${id}`) : client.get(base),
        };
    }

    statistics(userId)     { return { get: () => this.#client.get(`/users/${userId}/statistics`) }; }

    /** Read-only: login attempts are recorded by the auth flow itself, not over the API. */
    logins(userId) {
        const base = `/users/${userId}/logins`;
        const client = this.#client;
        return {
            get: () => client.get(base),
        };
    }

    experiences(userId) {
        const base = `/users/${userId}/experiences`;
        const client = this.#client;
        return {
            get:    (id = null) => id ? client.get(`${base}/${id}`) : client.get(base),
            create: (data)      => client.put(base, data),
            edit:   (id, data)  => client.patch(`${base}/${id}`, data),
            delete: (id)        => client.del(`${base}/${id}`),
        };
    }

    organizations(userId) {
        const base = `/users/${userId}/organizations`;
        const client = this.#client;
        return {
            get:    (id = null) => id ? client.get(`${base}/${id}`) : client.get(base),
            create: (data)      => client.put(base, data),
            delete: (id)        => client.del(`${base}/${id}`),
        };
    }

    pushEndpoints(userId) {
        const base = `/users/${userId}/push-endpoints`;
        const client = this.#client;
        return {
            get:    (id = null) => id ? client.get(`${base}/${id}`) : client.get(base),
            create: (data)      => client.put(base, data),
            delete: (id)        => client.del(`${base}/${id}`),
        };
    }

    /** GET /users/{orgId}/organization/courses — slots owned by this org with assignee + course. */
    organizationCourses(orgId) { return this.#client.get(`/users/${orgId}/organization/courses`); }

    /** PATCH /users/{orgId}/courses/{id}/assign — reassign a slot to a member. */
    assignCourse(orgId, id, data) { return this.#client.patch(`/users/${orgId}/courses/${id}/assign`, data); }

    /** GET /users/{orgId}/organization/members — members where manager_id = orgId. */
    organizationMembers(orgId) { return this.#client.get(`/users/${orgId}/organization/members`); }

    /** GET /users/{orgId}/organization/students — distinct students with a course_count, for the Students tab list. */
    organizationStudents(orgId) { return this.#client.get(`/users/${orgId}/organization/students`); }

    /** Employee-only: everything this user already owns (courses/sessions/quizzes). */
    ownedItems(userId) { return this.#client.get(`/users/${userId}/owned-items`); }

    /** Sales-and-above: mint a one-time login link that logs the browser in as this user. */
    phantom(userId) { return this.#client.post(`/users/${userId}/phantom`); }

    /** Sales-and-above: re-run the course/individual-session access reconciliation for this user on demand. */
    syncAccess(userId) { return this.#client.post(`/users/${userId}/sync-access`); }

    /** Read-only: notifications are created by internal services, not over the API. */
    notifications(userId) {
        const base = `/users/${userId}/notifications`;
        const client = this.#client;
        return {
            get: () => client.get(base),
        };
    }

    /** KYC verification for this user. markUploaded: self or staff. approve/reject: Employee-tier only. */
    kyc(userId) {
        const base = `/users/${userId}/kyc`;
        const client = this.#client;
        return {
            /** type: 'dni-front' | 'dni-back' | 'selfie'. */
            markUploaded: (type) => client.patch(`${base}/${type}`),
            approve: () => client.post(`${base}/approve`),
            reject: () => client.post(`${base}/reject`),
        };
    }
}
