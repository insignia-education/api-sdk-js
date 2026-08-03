export default class Sales {
    #client;

    constructor(client) {
        this.#client = client;
    }

    /** Options for the UTM link generator: courses, session types, active coupons, known utm source/medium/campaign values. */
    utmGeneratorOptions() { return this.#client.get('/sales/utm-generator/options'); }

    /** Counts + amount totals for the current seller's own payments, by status (pending/approved/rejected). */
    myStats() { return this.#client.get('/sales/my-stats'); }

    /** Paginated list of the current seller's own attributed payments. */
    mySales({ page, perPage } = {}) {
        return this.#client.get('/sales/my-sales', { page, per_page: perPage });
    }

    /** Sellers and above: users with all 3 KYC files uploaded but not yet verified. */
    kycPending() { return this.#client.get('/sales/kyc-pending'); }
}
