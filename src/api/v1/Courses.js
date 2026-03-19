export default class Courses {
    #client;

    constructor(client) {
        this.#client = client;
    }

    get(id = null)  { return id ? this.#client.get(`/courses/${id}`) : this.#client.get('/courses'); }
    create(data)    { return this.#client.put('/courses', data); }
    edit(id, data)  { return this.#client.patch(`/courses/${id}`, data); }
    delete(id)      { return this.#client.del(`/courses/${id}`); }

    dates(courseId) {
        const base = `/courses/${courseId}/dates`;
        return {
            get:    (id = null) => id ? this.#client.get(`${base}/${id}`) : this.#client.get(base),
            create: (data)      => this.#client.put(base, data),
            edit:   (id, data)  => this.#client.patch(`${base}/${id}`, data),
            delete: (id)        => this.#client.del(`${base}/${id}`),
        };
    }

    sessions(courseId) {
        const base = `/courses/${courseId}/sessions`;
        return {
            get:    (id = null) => id ? this.#client.get(`${base}/${id}`) : this.#client.get(base),
            create: (data)      => this.#client.put(base, data),
            edit:   (id, data)  => this.#client.patch(`${base}/${id}`, data),
            delete: (id)        => this.#client.del(`${base}/${id}`),
        };
    }

    premiums(courseId) {
        const client = this.#client;
        const base = `/courses/${courseId}/premiums`;
        return {
            get:    (id = null) => id ? client.get(`${base}/${id}`) : client.get(base),
            create: (data)      => client.put(base, data),
            edit:   (id, data)  => client.patch(`${base}/${id}`, data),
            delete: (id)        => client.del(`${base}/${id}`),
            items:  (premiumId) => {
                const iBase = `${base}/${premiumId}/items`;
                return {
                    get:    (id = null) => id ? client.get(`${iBase}/${id}`) : client.get(iBase),
                    create: (data)      => client.put(iBase, data),
                    edit:   (id, data)  => client.patch(`${iBase}/${id}`, data),
                    delete: (id)        => client.del(`${iBase}/${id}`),
                };
            },
        };
    }

    levels(courseId) {
        const client = this.#client;
        const base = `/courses/${courseId}/levels`;
        return {
            get:    (id = null) => id ? client.get(`${base}/${id}`) : client.get(base),
            create: (data)      => client.put(base, data),
            edit:   (id, data)  => client.patch(`${base}/${id}`, data),
            delete: (id)        => client.del(`${base}/${id}`),
            lessons: (levelId) => {
                const lBase = `${base}/${levelId}/lessons`;
                return {
                    get:    (id = null) => id ? client.get(`${lBase}/${id}`) : client.get(lBase),
                    create: (data)      => client.put(lBase, data),
                    edit:   (id, data)  => client.patch(`${lBase}/${id}`, data),
                    delete: (id)        => client.del(`${lBase}/${id}`),
                    materials: (lessonId) => {
                        const mBase = `${lBase}/${lessonId}/materials`;
                        return {
                            get:    (id = null) => id ? client.get(`${mBase}/${id}`) : client.get(mBase),
                            create: (data)      => client.put(mBase, data),
                            edit:   (id, data)  => client.patch(`${mBase}/${id}`, data),
                            delete: (id)        => client.del(`${mBase}/${id}`),
                        };
                    },
                };
            },
        };
    }
}
