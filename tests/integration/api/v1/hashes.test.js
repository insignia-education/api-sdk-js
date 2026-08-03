import InsigniaApiV1 from '../../../../src/api/v1/index.js';

const api = new InsigniaApiV1(process.env.INSIGNIA_EDUCATION_API_BASE_URL);

const login = () => api.auth.login({
    email: process.env.TEST_EMAIL,
    password: process.env.TEST_PASSWORD,
});

describe('api/v1/hashes', () => {
    test('get | authenticated', async () => {
        await login();
        await api.hashes.get()
            .then(response => {
                response = Object.values(response);
                expect(Array.isArray(response)).toBe(true);
                response.forEach(hash => {
                    expect(hash["id"]).toBeDefined();
                    expect(hash["hash"]).toBeDefined();
                    expect(hash["purpose_id"]).toBeDefined();
                    expect(hash["created_at"]).toBeDefined();
                    expect(hash["updated_at"]).toBeDefined();
                });
            });
    });
});
