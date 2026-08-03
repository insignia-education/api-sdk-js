import { 
    api, 
    loginCustomer,
    loginAdmin
} from '../../../../helpers.js';

describe('api/v1/courses/cod/:cod', () => {
    test('get by cod | returns matching course', async () => {
        const firstPage = await api.courses.get();
        const cod = firstPage["data"][0]["cod"];
        await api.courses.getByCod(cod)
            .then(response => {
                expect(response["id"]).toBeDefined();
                expect(response["cod"]).toBe(cod);
                expect(response["title"]).toBeDefined();
                expect(response["enabled"]).toBeDefined();
            });
    });
});
