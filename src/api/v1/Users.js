export default class Users {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)  { return id ? this.#client.get(`/users/${id}`) : this.#client.get('/users'); }
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

    courses(userId)        { return this.#nested(userId, 'courses'); }
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
            verify: (id)        => client.post(`${base}/${id}/verify`),
            reject: (id, data)  => client.post(`${base}/${id}/reject`, data),
        };
    }

    points(userId) {
        const base = `/users/${userId}/points`;
        const client = this.#client;
        return {
            get:    (id = null) => id ? client.get(`${base}/${id}`) : client.get(base),
            create: (data)      => client.put(base, data),
            delete: (id)        => client.del(`${base}/${id}`),
        };
    }

    moneyMoves(userId) {
        const base = `/users/${userId}/money-moves`;
        const client = this.#client;
        return {
            get:    (id = null) => id ? client.get(`${base}/${id}`) : client.get(base),
            create: (data)      => client.put(base, data),
        };
    }

    statistics(userId)     { return { get: () => this.#client.get(`/users/${userId}/statistics`) }; }

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
}
