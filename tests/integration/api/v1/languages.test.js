
import InsigniaApiV1 from '../../../../src/api/v1/index.js';

const api = new InsigniaApiV1(process.env.INSIGNIA_EDUCATION_API_BASE_URL);


describe('api/v1/languages', () => {
    test('get', async () => {
        await api.languages.get()
        .then(response => {
            response = Object.values(response);
            expect(response.length > 0).toBe(true);
            response.forEach(language => {
                expect(language["id"]).toBeDefined();
                expect(language["iso"]).toBeDefined();
                expect(language["flag_emoji"]).toBeDefined();
                expect(language["enabled"]).toBeDefined();
                expect(language["default"]).toBeDefined();
                expect(language["created_at"]).toBeDefined();
                expect(language["updated_at"]).toBeDefined();
                expect(language["deleted_at"]).toBeDefined();
            })
            
        });
    });
});


