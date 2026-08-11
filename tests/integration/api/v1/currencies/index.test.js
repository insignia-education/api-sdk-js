import { 
    api, 
    loginCustomer,
    loginAdmin
} from '../../../../helpers.js';

describe('api/v1/currencies', () => {
    test('get', async () => {
        await api.currencies.get()
        .then(response => {
            expect(response["1"]).toBeDefined();
            expect(response["1"]["id"]).toBeDefined();
            expect(response["1"]["country_id"]).toBeDefined();
            expect(response["1"]["cod"]).toBeDefined();
            expect(response["1"]["title"]).toBeDefined();
            expect(response["1"]["enabled"]).toBeDefined();
            expect(response["1"]["has_double_expression"]).toBeDefined();
            expect(response["1"]["double_expression_by"]).toBeDefined();
            expect(response["1"]["created_at"]).toBeDefined();
            expect(response["1"]["updated_at"]).toBeDefined();
            expect(response["1"]["deleted_at"]).toBeDefined();
        });
    });
});
