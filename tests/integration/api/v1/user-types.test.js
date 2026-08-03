import InsigniaApiV1 from '../../../../src/api/v1/index.js';

const api = new InsigniaApiV1(process.env.INSIGNIA_EDUCATION_API_BASE_URL);

describe('api/v1/user-types', () => {
    test('get', async () => {
        await api.userTypes.get()
            .then(response => {
                response = Object.values(response);
                expect(response.length > 0).toBe(true);
                response.forEach(userType => {
                    expect(userType["id"]).toBeDefined();
                    expect(userType["cod"]).toBeDefined();
                    expect(userType["title"]).toBeDefined();
                    expect(userType["enabled"]).toBeDefined();
                });
            });
    });
});
