import { 
    api, 
    loginCustomer,
    loginAdmin
} from '../../../../helpers.js';

describe('api/v1/currencies/values', () => {

    test('get', async () => {
        await api.currencies.getValues()
        .then(response => {
            response = Object.values(response);
            expect(response.length > 0).toBe(true);
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
