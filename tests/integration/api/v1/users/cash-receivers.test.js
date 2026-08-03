import { 
    api, 
    loginCustomer,
    loginAdmin
} from '../../../../helpers.js';

describe('api/v1/users/cash-receivers', () => {
    test('get', async () => {
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

