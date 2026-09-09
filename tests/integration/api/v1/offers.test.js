import { api, loginAdmin } from '../../../helpers.js';

describe('api/v1/offers', () => {
    test('get | authenticated', async () => {
        await loginAdmin();
        await api.offers.get()
            .then(response => {
                expect(Array.isArray(response["data"])).toBe(true);
                expect(response["data"].length > 0).toBe(true);
                response["data"].forEach(offer => {
                    expect(offer["id"]).toBeDefined();
                    expect(offer["title"]).toBeDefined();
                    expect(offer["percentage"]).toBeDefined();
                    expect(offer["enabled"]).toBeDefined();
                    expect(offer["created_at"]).toBeDefined();
                    expect(offer["updated_at"]).toBeDefined();
                });
            });
    });
});
