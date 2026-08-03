import InsigniaApiV1 from '../../../../src/api/v1/index.js';

const api = new InsigniaApiV1(process.env.INSIGNIA_EDUCATION_API_BASE_URL);

describe('api/v1/taxes', () => {
    test('get', async () => {
        await api.taxes.get()
            .then(response => {
                response = Object.values(response);
                expect(response.length > 0).toBe(true);
                response.forEach(tax => {
                    expect(tax["id"]).toBeDefined();
                    expect(tax["cod"]).toBeDefined();
                    expect(tax["title"]).toBeDefined();
                    expect(tax["percentage"]).toBeDefined();
                    expect(tax["enabled"]).toBeDefined();
                });
            });
    });
});
