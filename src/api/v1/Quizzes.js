export default class Quizzes {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /**
     * With no id: full unpaginated list by default (used by course/coupon/offer
     * pickers). Pass search/page/perPage to get a paginated + searchable page
     * instead (used by the admin Quizzes list).
     */
    get(id = null, { search = null, page = null, perPage = null } = {}) {
        if (id) return this.#client.get(`/quizzes/${id}`);
        if (search != null || page != null || perPage != null) {
            return this.#client.get('/quizzes', { search, page, per_page: perPage ?? 15 });
        }
        return this.#client.get('/quizzes');
    }
    create(data)    { return this.#client.put('/quizzes', data); }
    edit(id, data)  { return this.#client.patch(`/quizzes/${id}`, data); }
    delete(id)      { return this.#client.del(`/quizzes/${id}`); }

    questions(quizId) {
        const client = this.#client;
        const base = `/quizzes/${quizId}/questions`;
        return {
            get:    (id = null) => id ? client.get(`${base}/${id}`) : client.get(base),
            create: (data)      => client.put(base, data),
            edit:   (id, data)  => client.patch(`${base}/${id}`, data),
            delete: (id)        => client.del(`${base}/${id}`),
            answers: (questionId) => {
                const aBase = `${base}/${questionId}/answers`;
                return {
                    get:    (id = null) => id ? client.get(`${aBase}/${id}`) : client.get(aBase),
                    create: (data)      => client.put(aBase, data),
                    edit:   (id, data)  => client.patch(`${aBase}/${id}`, data),
                    delete: (id)        => client.del(`${aBase}/${id}`),
                };
            },
        };
    }
}
