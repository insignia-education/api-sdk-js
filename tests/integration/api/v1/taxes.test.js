import { api, loginAdmin } from '../../../helpers.js';

describe('api/v1/taxes', () => {
    test('get', async () => {
        await loginAdmin();
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
