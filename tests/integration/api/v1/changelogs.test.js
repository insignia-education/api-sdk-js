import { 
    api, 
    loginCustomer,
    loginAdmin
} from '../../../helpers.js';

describe('api/v1/changelogs', () => {
    test('get | authenticated', async () => {
        await loginAdmin();
        await api.changelogs.get()
            .then(response => {
                response = Object.values(response);
                expect(Array.isArray(response)).toBe(true);
                response.forEach(changelog => {
                    expect(changelog["id"]).toBeDefined();
                    expect(changelog["created_at"]).toBeDefined();
                    expect(changelog["updated_at"]).toBeDefined();
                });
            });
    });
});
