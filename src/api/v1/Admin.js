export default class Admin {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Paginated list of courses with their currently-active course_dates. */
    courseDates({ page, perPage } = {}) {
        return this.#client.get('/admin/courses/current-dates', { page, per_page: perPage });
    }

    /** Date-range sales report: totals by status (pending/approved/rejected), and the same split by course, payment method and currency. */
    statisticsSales({ fromDate, toDate } = {}) {
        return this.#client.get('/admin/statistics/sales', { from_date: fromDate, to_date: toDate });
    }

    /** Claude (Anthropic) token usage/spend for a date range, plus account balance. Each half resolves `{ available: false }` (not an error) when its required config (admin key / account balance) isn't set. */
    statisticsClaudeUsage({ fromDate, toDate } = {}) {
        return this.#client.get('/admin/statistics/claude-usage', { from_date: fromDate, to_date: toDate });
    }

    /** Both rotating PayPal accounts' real available balance, keyed "1"/"2". Each resolves `{ available: false }` (not an error) if that account's "Transaction Search" feature isn't enabled in PayPal's dashboard yet. */
    statisticsPaypalBalance({ currency } = {}) {
        return this.#client.get('/admin/statistics/paypal-balance', { currency });
    }

    /** Raw PayPal transaction list for a date range (max 31 days) against one account slot (1 or 2, default 1). Resolves `{ available: false }` the same way statisticsPaypalBalance() does when it can't be read. */
    statisticsPaypalTransactions({ fromDate, toDate, slot } = {}) {
        return this.#client.get('/admin/statistics/paypal-transactions', { from_date: fromDate, to_date: toDate, slot });
    }

    /** Direct download link for the same PayPal transaction list (format: 'csv' | 'xlsx') — open with <a href>, same convention as reportsSalesExportUrl(). Downloads a headers-only file rather than erroring if the account isn't available. */
    statisticsPaypalTransactionsExportUrl({ fromDate, toDate, slot, format = 'csv' } = {}) {
        return Admin.#buildUrl(this.#client.baseUrl, '/admin/statistics/paypal-transactions/export', {
            from_date: fromDate, to_date: toDate, slot, format,
        });
    }

    /** Our wallet's live on-chain balance for every crypto asset/chain we accept payment in — [{ asset, chain, balance }]. Read straight from the chain, not a sum of recorded payments. */
    statisticsCryptoBalances() {
        return this.#client.get('/admin/statistics/crypto-balances');
    }

    /** Our Stripe account's current available/pending balance, broken down per currency. Resolves `{ available: false }` (not an error) if the account can't be read. */
    statisticsStripeBalance() {
        return this.#client.get('/admin/statistics/stripe-balance');
    }

    /** Raw Stripe balance-transaction list (charges, refunds, fees, payouts) for a date range. Resolves `{ available: false }` the same way statisticsStripeBalance() does. */
    statisticsStripeTransactions({ fromDate, toDate } = {}) {
        return this.#client.get('/admin/statistics/stripe-transactions', { from_date: fromDate, to_date: toDate });
    }

    /** Direct download link for the same Stripe transaction list (format: 'csv' | 'xlsx'). */
    statisticsStripeTransactionsExportUrl({ fromDate, toDate, format = 'csv' } = {}) {
        return Admin.#buildUrl(this.#client.baseUrl, '/admin/statistics/stripe-transactions/export', {
            from_date: fromDate, to_date: toDate, format,
        });
    }

    /**
     * Our Binance holdings and recent money movement — distinct from
     * statisticsCryptoBalances()' on-chain wallet balance. Resolves
     * `{ available, spot, earn, transactions }`:
     * - `spot` — non-zero Spot balances `{ asset, free, locked }`.
     * - `earn` — Simple Earn positions `{ asset, amount, type }`. Read from the
     *   dedicated endpoints, not the `LD*` pseudo-assets in the Spot response
     *   (those lag and under-report), which are stripped from `spot`.
     * - `transactions` — deposits, withdrawals, Binance Pay and P2P trades over
     *   Binance's 90-day window, newest first:
     *   `{ type, at, asset, amount, network, counterparty, tx_id, fiat_amount,
     *   fiat_currency, unit_price, pay_method, completed }` where type is
     *   `deposit` | `withdrawal` | `pay-in` | `pay-out` | `p2p-buy` | `p2p-sell`.
     *   Only P2P trades carry a fiat leg (`fiat_amount`/`fiat_currency`/
     *   `unit_price`/`pay_method`); they're null for every other type.
     *   `counterparty` is the destination wallet on a withdrawal, the sender's
     *   wallet on a deposit (Binance itself only records our own receiving
     *   address, so this is resolved on-chain — null if the network/coin isn't
     *   one of the ones that lookup covers, e.g. an unmapped chain), and the
     *   other person on Pay/P2P. `tx_id` is set for on-chain movements only.
     *
     * Resolves `{ available: false }` if the proxy isn't configured or the call fails.
     */
    statisticsBinanceBalances() {
        return this.#client.get('/admin/statistics/binance-balances');
    }

    /**
     * Direct download link for the same `transactions` list (format: 'csv' |
     * 'xlsx') — no date-range params, unlike the PayPal/Stripe export links
     * above: Binance's own API already caps history at 90 days, so this
     * always exports the full set that's currently available.
     */
    statisticsBinanceTransactionsExportUrl({ format = 'csv' } = {}) {
        return Admin.#buildUrl(this.#client.baseUrl, '/admin/statistics/binance-transactions/export', { format });
    }

    /** Paginated sales-report rows for a date range, with optional course/seller/payment-method/currency filters. */
    reportsSales({ fromDate, toDate, courseId, sellerId, paymentMethodId, currencyId, page, perPage } = {}) {
        return this.#client.get('/admin/reports/sales', {
            from_date: fromDate, to_date: toDate,
            course_id: courseId, seller_id: sellerId, payment_method_id: paymentMethodId, currency_id: currencyId,
            page, per_page: perPage,
        });
    }

    /** Sellers with at least one attributed payment — options for the sales report's seller filter. */
    reportsSalesSellers() { return this.#client.get('/admin/reports/sales/sellers'); }

    /** Direct download link for the sales report (format: 'csv' | 'xlsx') — open with <a href>, not fetch (cookie-authenticated, same convention as Users.js's invoiceUrl). */
    reportsSalesExportUrl({ fromDate, toDate, courseId, sellerId, paymentMethodId, currencyId, format = 'csv' } = {}) {
        return Admin.#buildUrl(this.#client.baseUrl, '/admin/reports/sales/export', {
            from_date: fromDate, to_date: toDate,
            course_id: courseId, seller_id: sellerId, payment_method_id: paymentMethodId, currency_id: currencyId,
            format,
        });
    }

    /** Paginated completed-courses report rows for a date range, with an optional course filter. */
    reportsCompletedCourses({ fromDate, toDate, courseId, page, perPage } = {}) {
        return this.#client.get('/admin/reports/completed-courses', {
            from_date: fromDate, to_date: toDate, course_id: courseId, page, per_page: perPage,
        });
    }

    /** Direct download link for the completed-courses report (format: 'csv' | 'xlsx'). */
    reportsCompletedCoursesExportUrl({ fromDate, toDate, courseId, format = 'csv' } = {}) {
        return Admin.#buildUrl(this.#client.baseUrl, '/admin/reports/completed-courses/export', {
            from_date: fromDate, to_date: toDate, course_id: courseId, format,
        });
    }

    /** Paginated per-teacher report for a date range: hours given, sessions given, absences (substituted out) and substitutions (covered for someone else). */
    reportsTeacherStats({ fromDate, toDate, page, perPage } = {}) {
        return this.#client.get('/admin/reports/teacher-stats', {
            from_date: fromDate, to_date: toDate, page, per_page: perPage,
        });
    }

    /** Direct download link for the teacher-stats report (format: 'csv' | 'xlsx'). */
    reportsTeacherStatsExportUrl({ fromDate, toDate, format = 'csv' } = {}) {
        return Admin.#buildUrl(this.#client.baseUrl, '/admin/reports/teacher-stats/export', {
            from_date: fromDate, to_date: toDate, format,
        });
    }

    /** Direct link to a repo's CI-generated test-coverage HTML report ('api' | 'front' | 'api-sdk-js') — open with <a href>/<iframe src>, cookie-authenticated, not fetch. */
    coverageUrl(repo) {
        return `${this.#client.baseUrl}/admin/coverage/${repo}/`;
    }

    /**
     * Recent GitHub Actions workflow runs for 'api' and 'front' (the only repos
     * GithubActionsService covers), newest first, `{ limit }` each (default 20, max 50).
     * Resolves `{ available: false }` (not an error) if the server has no GitHub token
     * configured, per repo — check `repos.api.available` / `repos.front.available`
     * separately rather than assuming both are up together.
     */
    actionsStatus({ limit } = {}) {
        return this.#client.get('/admin/actions/status', { limit });
    }

    static #buildUrl(baseUrl, path, params) {
        const qs = new URLSearchParams(
            Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
        ).toString();
        return `${baseUrl}${path}${qs ? `?${qs}` : ''}`;
    }
}
