import { api, loginAdmin } from '../../../../helpers.js';

describe('api/v1/users/cart-sellers', () => {
    test('get', async () => {
        await loginAdmin();
        await api.users.cartSellers()
            .then(response => {
                expect(response.length > 0).toBe(true);
                response.forEach(user => {
                    expect(user["id"]).toBeDefined();
                    expect(user["name"]).toBeDefined();
                })
            })
    });
});
