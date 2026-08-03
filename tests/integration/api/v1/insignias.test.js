import InsigniaApiV1 from '../../../../src/api/v1/index.js';

const api = new InsigniaApiV1(process.env.INSIGNIA_EDUCATION_API_BASE_URL);

describe('api/v1/insignias', () => {
    test('get', async () => {
        await api.insignias.get()
            .then(response => {
                response = Object.values(response);
                expect(response.length > 0).toBe(true);
                response.forEach(insignia => {
                    expect(insignia["id"]).toBeDefined();
                    expect(insignia["cod"]).toBeDefined();
                    expect(insignia["title"]).toBeDefined();
                    expect(insignia["enabled"]).toBeDefined();
                });
            });
    });
});
