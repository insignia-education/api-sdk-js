/**
 * Reusable advertisements shown in the course player after a lesson.
 *
 * An ad: { id, title, description, max_views (null = unlimited), views_count, priority,
 *          links: { [iso]: url },
 *          dates: [{ starts_at: 'YYYY-MM-DD'|null, ends_at: 'YYYY-MM-DD'|null }],
 *          media: [{ percentage, files: { [iso]: { type: 'video'|'image', url } } }] }
 * Media percentages must add up to 100. An ad is shown when it has views left, an active date,
 * and at least one media file + a link for the student's language.
 *
 * Assigning an ad: courses take `ad_id` (null = none); levels and lessons take
 * `ad_mode` ('inherit' | 'none' | 'ad') + `ad_id` — see Courses.js.
 * Serving one to a student: `courses.levels(c).lessons(l).serveAd(lessonId, language)`.
 */
export default class Ads {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Without an id and without paging options: every ad (for pickers). With `page`/`perPage`: a paginated, title-searchable list. */
    get(id = null, { search = null, page = null, perPage = null } = {}) {
        if (id) return this.#client.get(`/ads/${id}`);
        if (page === null && perPage === null) return this.#client.get('/ads');
        return this.#client.get('/ads', { search, page: page ?? 1, per_page: perPage ?? 15 });
    }
    create(data)   { return this.#client.put('/ads', data); }
    edit(id, data) { return this.#client.patch(`/ads/${id}`, data); }
    delete(id)     { return this.#client.del(`/ads/${id}`); }
}
