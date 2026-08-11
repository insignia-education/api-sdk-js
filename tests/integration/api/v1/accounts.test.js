import { 
    api, 
    loginCustomer,
    loginAdmin
} from '../../../helpers.js';

describe('api/v1/accounts', () => {
    // Client#request() throws on non-2xx (err.status, err.data) rather than
    // resolving — assert against a rejected promise, not a resolved
    // {success, status}.
    test('get | unauthenticated', async () => {
        await expect(api.accounts.get()).rejects.toMatchObject({ status: 401 });
    });
    test('get | authenticated but other type', async () => {
        await loginCustomer();
        await expect(api.accounts.get()).rejects.toMatchObject({ status: 403 });
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
