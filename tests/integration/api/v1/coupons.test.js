import InsigniaApiV1 from '../../../../src/api/v1/index.js';

const api = new InsigniaApiV1(process.env.INSIGNIA_EDUCATION_API_BASE_URL);

const login = () => api.auth.login({
    email: process.env.TEST_EMAIL,
    password: process.env.TEST_PASSWORD,
});

describe('api/v1/coupons', () => {
    test('get | authenticated', async () => {
        await login();
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
