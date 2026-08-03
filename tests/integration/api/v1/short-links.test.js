import InsigniaApiV1 from '../../../../src/api/v1/index.js';

const api = new InsigniaApiV1(process.env.INSIGNIA_EDUCATION_API_BASE_URL);

const login = () => api.auth.login({
    email: process.env.TEST_EMAIL,
    password: process.env.TEST_PASSWORD,
});

describe('api/v1/short-links', () => {
    test('get | authenticated', async () => {
        await login();
        await api.shortLinks.get()
            .then(response => {
                response = Object.values(response);
                expect(Array.isArray(response)).toBe(true);
                response.forEach(link => {
                    expect(link["id"]).toBeDefined();
                    expect(link["cod"]).toBeDefined();
                    expect(link["url"]).toBeDefined();
                    expect(link["enabled"]).toBeDefined();
                    expect(link["created_at"]).toBeDefined();
                    expect(link["updated_at"]).toBeDefined();
                });
            });
    });
});
