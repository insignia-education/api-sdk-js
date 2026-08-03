import { 
    api, 
    loginCustomer,
    loginAdmin
} from '../../../helpers.js';

describe('api/v1/accounts', () => {
    test('get | unauthenticated', async () => {
        await api.accounts.get()
            .then(response => {
                expect(response.success).toBe(false);
                expect(response.status).toBe(401);
            });
    });
    test('get | authenticated but other type', async () => {
        await loginCustomer();
        await api.accounts.get()
            .then(response => {
                console.log(response);
                expect(response.success).toBe(false);
                expect(response.status).toBe(403);
            });
    });
    test('get | authenticated', async () => {
        await loginAdmin();
        await api.accounts.get()
            .then(response => {
                response = Object.values(response);
                expect(response.length > 0).toBe(true);
                response.forEach(account => {
                    expect(account["id"]).toBeDefined();
                    expect(account["cod"]).toBeDefined();
                    expect(account["title"]).toBeDefined();
                });
            });
    });
});
