import {
    api,
    loginCustomer,
    loginAdmin
} from '../../../../helpers.js';

describe('api/v1/currencies/{id}/history', () => {

    test('get', async () => {
        await loginAdmin();
        await api.currencies.getHistory(1)
        .then(response => {
            response = Object.values(response);
            response.forEach(value => {
                expect(value["id"]).toBeDefined();
                expect(value["currency_id"]).toBeDefined();
                expect(value["value"]).toBeDefined();
                expect(value["created_at"]).toBeDefined();
                expect(value["updated_at"]).toBeDefined();
            })
        });
    });
});
