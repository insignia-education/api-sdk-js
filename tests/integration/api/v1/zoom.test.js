import InsigniaApiV1 from '../../../../src/api/v1/index.js';

const api = new InsigniaApiV1(process.env.INSIGNIA_EDUCATION_API_BASE_URL);

const login = () => api.auth.login({
    email: process.env.TEST_EMAIL,
    password: process.env.TEST_PASSWORD,
});

describe('api/v1/zoom/meetings', () => {
    test('get | authenticated', async () => {
        await login();
        await api.zoom.meetings().get()
            .then(response => {
                response = Object.values(response);
                expect(Array.isArray(response)).toBe(true);
                response.forEach(meeting => {
                    expect(meeting["id"]).toBeDefined();
                    expect(meeting["created_at"]).toBeDefined();
                    expect(meeting["updated_at"]).toBeDefined();
                });
            });
    });
});
