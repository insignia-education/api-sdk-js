import InsigniaApiV1 from '../../../../src/api/v1/index.js';

const api = new InsigniaApiV1(process.env.INSIGNIA_EDUCATION_API_BASE_URL);

const login = () => api.auth.login({
    email: process.env.TEST_EMAIL,
    password: process.env.TEST_PASSWORD,
});

describe('api/v1/mail-blacklist', () => {
    test('get | authenticated', async () => {
        await login();
        await api.mailBlacklist.get()
            .then(response => {
                response = Object.values(response);
                expect(Array.isArray(response)).toBe(true);
                response.forEach(entry => {
                    expect(entry["id"]).toBeDefined();
                    expect(entry["email"]).toBeDefined();
                    expect(entry["type_id"]).toBeDefined();
                    expect(entry["created_at"]).toBeDefined();
                    expect(entry["updated_at"]).toBeDefined();
                });
            });
    });
});
