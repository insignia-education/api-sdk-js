import { api, loginAdmin } from '../../../helpers.js';

describe('api/v1/coupons', () => {
    test('get | authenticated', async () => {
        await loginAdmin();
        await api.coupons.get()
            .then(response => {
                response = Object.values(response);
                expect(Array.isArray(response)).toBe(true);
                response.forEach(coupon => {
                    expect(coupon["id"]).toBeDefined();
                    expect(coupon["cod"]).toBeDefined();
                    expect(coupon["enabled"]).toBeDefined();
                    expect(coupon["created_at"]).toBeDefined();
                    expect(coupon["updated_at"]).toBeDefined();
                });
            });
    });
});
