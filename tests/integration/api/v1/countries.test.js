
import InsigniaApiV1 from '../../../../src/api/v1/index.js';

const api = new InsigniaApiV1(process.env.INSIGNIA_EDUCATION_API_BASE_URL);

describe('api/v1/countries', () => {
    test('get', async () => {
        api.countries.get()
        .then(response => {
            response = Object.values(response);
            expect(response.length > 0).toBe(true);
            response.forEach(country => {
                expect(country["id"]).toBeDefined();
                expect(country["cod"]).toBeDefined();
                expect(country["domain"]).toBeDefined();
                expect(country["phone_prefix"]).toBeDefined();
            })
        });
    });
});
