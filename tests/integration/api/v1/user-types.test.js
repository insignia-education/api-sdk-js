import { api, loginAdmin } from '../../../helpers.js';

describe('api/v1/user-types', () => {
    test('get', async () => {
        await loginAdmin();
        await api.userTypes.get()
            .then(response => {
                response = Object.values(response);
                expect(response.length > 0).toBe(true);
                response.forEach(userType => {
                    expect(userType["id"]).toBeDefined();
                    expect(userType["cod"]).toBeDefined();
                    expect(userType["title"]).toBeDefined();
                });
            });
    });
});
