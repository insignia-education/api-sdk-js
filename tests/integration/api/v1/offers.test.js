import InsigniaApiV1 from '../../../../src/api/v1/index.js';

const api = new InsigniaApiV1(process.env.INSIGNIA_EDUCATION_API_BASE_URL);

const login = () => api.auth.login({
    email: process.env.TEST_EMAIL,
    password: process.env.TEST_PASSWORD,
});

describe('api/v1/offers', () => {
    test('get | authenticated', async () => {
        await login();
        await api.offers.get()
            .then(response => {
                response = Object.values(response);
                expect(Array.isArray(response)).toBe(true);
                response.forEach(offer => {
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
