import { 
    api, 
    loginCustomer,
    loginAdmin
} from '../../../../helpers.js';

describe('api/v1/forums', () => {
    test('get | authenticated', async () => {
        await loginCustomer();
        await api.forums.get()
            .then(response => {
                response = Object.values(response);
                expect(Array.isArray(response)).toBe(true);
                response.forEach(forum => {
                    expect(forum["id"]).toBeDefined();
                    expect(forum["title"]).toBeDefined();
                    expect(forum["enabled"]).toBeDefined();
                    expect(forum["created_at"]).toBeDefined();
                    expect(forum["updated_at"]).toBeDefined();
                });
            });
    });
});
