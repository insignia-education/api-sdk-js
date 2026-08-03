export default class Payments {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Employee-only: paginated list of all payments. status: 'pending' | 'approved' | 'rejected'. */
    get({ status = null, page = 1, perPage = 15 } = {}) {
        return this.#client.get('/payments', { status, page, per_page: perPage });
    }

    /** Employee-only: a single payment with its buyer/method/currency and courses/sessions/quizzes line items. */
    show(id) {
        return this.#client.get(`/payments/${id}`);
    }

    /** Employee-only: a payment's course line items. Amount is derived server-side from the selected course's price. */
    courses(paymentId) {
        const base = `/payments/${paymentId}/courses`;
        const client = this.#client;
        return {
            edit: (id, data) => client.patch(`${base}/${id}`, data),
        };
    }

    /**
     * Employee-only: apply or lift a coupon on an existing payment. A coupon
     * only discounts the lines it actually covers — preview() reports which
     * those are (and the resulting discount) without writing anything, and
     * apply() rejects a coupon that matches none of the payment's items.
     * Both apply() and remove() return the reloaded payment with its items.
     */
    coupon(paymentId) {
        const base = `/payments/${paymentId}/coupon`;
        const client = this.#client;
        return {
            preview: (cod) => client.get(`${base}/preview`, { cod }),
            apply:   (cod) => client.post(base, { cod }),
            remove:  ()    => client.del(base),
        };
    }

    /**
     * Employee-only: remove/restore any of a payment's line items. Removal is a
     * soft delete — the line stays visible in the admin panel flagged as removed,
     * and restore() puts it back. `type` is one of 'courses' | 'sessions' |
     * 'quizzes' | 'premiums' | 'taxes'.
     */
    items(paymentId) {
        const base = `/payments/${paymentId}`;
        const client = this.#client;
        return {
            /**
             * Adds a line. `data` carries only identifiers — every price is
             * derived server-side from the selected entity, never sent by the
             * client. By type: courses `{course_id, course_date_id?}`, premiums
             * `{course_premium_id}`, sessions `{course_id, type_id, quantity}`,
             * quizzes `{quiz_id, course_id, quantity}`, taxes `{tax_id}`.
             */
            create:  (type, data) => client.put(`${base}/${type}`, data),
            delete:  (type, id) => client.del(`${base}/${type}/${id}`),
            restore: (type, id) => client.post(`${base}/${type}/${id}/restore`),
        };
    }

    /** Employee-only: a payment's premium line items. Amount is derived server-side from the selected premium's course price * percentage + fixed price. */
    premiums(paymentId) {
        const base = `/payments/${paymentId}/premiums`;
        const client = this.#client;
        return {
            edit: (id, data) => client.patch(`${base}/${id}`, data),
        };
    }
}
