export default class Games {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /**
     * With no id: paginated list of the games the authenticated user hosts or plays in
     * (admins get every game). Pass search/page/perPage to filter and page it.
     * Write methods (create/edit/delete/restore) are teacher+ and, except for admins, host-only.
     */
    get(id = null, { search = null, page = null, perPage = null } = {}) {
        if (id) return this.#client.get(`/games/${id}`);
        return this.#client.get('/games', { search, page, per_page: perPage ?? 15 });
    }
    /** `data`: `{ title, type }` — type is `kahoot` or `jeopardy`. The creator becomes the host. */
    create(data)    { return this.#client.put('/games', data); }
    /** `data`: `{ title?, status? }` — status is `draft`, `lobby`, `in_progress` or `finished`. */
    edit(id, data)  { return this.#client.patch(`/games/${id}`, data); }
    delete(id)      { return this.#client.del(`/games/${id}`); }
    /** Undoes delete() — brings a soft-deleted game back. */
    restore(id)     { return this.#client.post(`/games/${id}/restore`); }

    /** Host and players of a game. */
    players(id)     { return this.#client.get(`/games/${id}/players`); }
    /** Takes a seat as a player — only while the game's status is `lobby`. */
    join(id)        { return this.#client.post(`/games/${id}/join`); }
    /** Host/admin only; hosts themselves can't be removed. */
    removePlayer(id, userId) { return this.#client.del(`/games/${id}/players/${userId}`); }

    /**
     * Hosts/admins get every question (answers included); players only the enabled ones,
     * without answers. Kahoot data: `{ question, options: [{ text, is_correct }], points?, time_limit? }`;
     * Jeopardy data: `{ question, category, answer, points? }`. `enabled` toggles a question on/off.
     */
    questions(gameId) {
        const client = this.#client;
        const base = `/games/${gameId}/questions`;
        return {
            get:    ()          => client.get(base),
            create: (data)      => client.put(base, data),
            edit:   (id, data)  => client.patch(`${base}/${id}`, data),
            delete: (id)        => client.del(`${base}/${id}`),
            /** Undoes delete() — brings a soft-deleted question back. */
            restore: (id)       => client.post(`${base}/${id}/restore`),
        };
    }
}
