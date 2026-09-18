export default class Search {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /**
     * Sales-and-above global search: users (name/email/dni) and courses (cod/title).
     * `offset` pages through the user results only (courses are always the first page) —
     * response includes `users_has_more` to know whether another page exists.
     * `includeTrashed` opts into soft-deleted accounts (flagged via `deleted_at` on the
     * returned row) — off by default, since this same endpoint also backs pickers (coupon
     * grant, referrer) that must never offer a deleted account as a valid target.
     * `unblockedOnly` excludes users with a `blocked_at` set — used by the bug-report
     * affected-user picker, which must never offer a blocked account as a target.
     */
    query(q, offset = 0, includeTrashed = false, unblockedOnly = false) {
        return this.#client.get('/search', {
            q,
            offset,
            include_trashed: includeTrashed ? 1 : undefined,
            unblocked_only: unblockedOnly ? 1 : undefined,
        });
    }
}
