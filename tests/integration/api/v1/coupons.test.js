import { api, loginAdmin } from '../../../helpers.js';

describe('api/v1/coupons', () => {
    test('get | authenticated', async () => {
        await loginAdmin();
        await api.coupons.get()
            .then(response => {
                expect(Array.isArray(response["data"])).toBe(true);
                expect(response["data"].length > 0).toBe(true);
                response["data"].forEach(coupon => {
                    expect(coupon["id"]).toBeDefined();
                    expect(coupon["cod"]).toBeDefined();
                    expect(coupon["created_at"]).toBeDefined();
                    expect(coupon["updated_at"]).toBeDefined();
                });
            });
    });
});
