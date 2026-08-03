import { 
    api, 
    loginCustomer,
    loginAdmin
} from '../../../../helpers.js';
describe('api/v1/payment-methods/by-currency/1', () => {
    test('get', async () => {
        await api.currencies.get()
            .then(response => {
                Object.values(response).forEach(async currency => {
                    await api.paymentMethods.byCurrency(currency.id)
                        .then(response => {
                            response = Object.values(response);
                            if(response.length == 0){
                                return;
                            }
                            expect(response[0]["id"]).toBeDefined();
                            expect(response[0]["currency_id"]).toBeDefined();
                            expect(response[0]["order"]).toBeDefined();
                            expect(response[0]["cod"]).toBeDefined();
                            expect(response[0]["title"]).toBeDefined();
                            expect(response[0]["requires_reference"]).toBeDefined();
                            expect(response[0]["can_upload_support"]).toBeDefined();
                            expect(response[0]["enabled"]).toBeDefined();
                            expect(response[0]["commission_amount"]).toBeDefined();
                            expect(response[0]["commission_percentage"]).toBeDefined();
                            expect(response[0]["description"]).toBeDefined();
                            expect(response[0]["image"]).toBeDefined();
                            expect(response[0]["icon"]).toBeDefined();
                            expect(response[0]["created_at"]).toBeDefined();
                            expect(response[0]["updated_at"]).toBeDefined();
                            expect(response[0]["deleted_at"]).toBeDefined();
                        })
                })
            })
    });
});

describe('users/cash-receivers', () => {
    test('get By currency id() returns a list', async () => {
        await api.users.cashReceivers()
            .then(response => {
                expect(response.length > 0).toBe(true);
                response.forEach(user => {
                    expect(user["id"]).toBeDefined();
                    expect(user["name"]).toBeDefined();
                })
            })
    });
});

