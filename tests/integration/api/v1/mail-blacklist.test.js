import { api, loginAdmin } from '../../../helpers.js';

describe('api/v1/mail-blacklist', () => {
    test('get | authenticated', async () => {
        await loginAdmin();
        await api.mailBlacklist.get()
            .then(response => {
                response = Object.values(response);
                expect(Array.isArray(response)).toBe(true);
                response.forEach(entry => {
                    expect(entry["id"]).toBeDefined();
                    expect(entry["email"]).toBeDefined();
                    expect(entry["type_id"]).toBeDefined();
                    expect(entry["created_at"]).toBeDefined();
                    expect(entry["updated_at"]).toBeDefined();
                });
            });
    });
});
