export default class Surveys {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)  { return id ? this.#client.get(`/surveys/${id}`) : this.#client.get('/surveys'); }
    create(data)    { return this.#client.put('/surveys', data); }
    edit(id, data)  { return this.#client.patch(`/surveys/${id}`, data); }
    delete(id)      { return this.#client.del(`/surveys/${id}`); }

    questions(surveyId) {
        const client = this.#client;
        const base = `/surveys/${surveyId}/questions`;
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
