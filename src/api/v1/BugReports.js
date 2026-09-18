export default class BugReports {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** File a bug report. body: { title, description, file_ids, affected_user_id? } */
    create(body) {
        return this.#client.post('/bug-reports', body);
    }

    /** Admin queue listing. params: { tab: 'pending_mine'|'unassigned'|'past_mine'|'past_all', per_page, page } */
    list(params = {}) {
        return this.#client.get('/bug-reports', params);
    }

    get(id) {
        return this.#client.get(`/bug-reports/${id}`);
    }

    assign(id, assignedUserId) {
        return this.#client.patch(`/bug-reports/${id}/assign`, { assigned_user_id: assignedUserId });
    }

    /** body: { status, dismissed_reason?, solution? } */
    updateStatus(id, body) {
        return this.#client.patch(`/bug-reports/${id}/status`, body);
    }

    /** { by_month, solved_by_user, dismissed_by_user } */
    statistics() {
        return this.#client.get('/bug-reports/statistics');
    }

    /** Direct download link (format: 'csv' | 'xlsx', default 'csv') — open with <a href>, cookie-authenticated, same convention as Admin's *ExportUrl() methods. */
    exportUrl({ format = 'csv' } = {}) {
        return BugReports.#buildUrl(this.#client.baseUrl, '/bug-reports/export', { format });
    }

    static #buildUrl(baseUrl, path, params) {
        const qs = new URLSearchParams(
            Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
        ).toString();
        return `${baseUrl}${path}${qs ? `?${qs}` : ''}`;
    }
}
