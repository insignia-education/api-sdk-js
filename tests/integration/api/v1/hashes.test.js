import { api, loginAdmin } from '../../../helpers.js';

describe('api/v1/hashes', () => {
    test('get | authenticated', async () => {
        await loginAdmin();
        await api.hashes.get()
            .then(response => {
                response = Object.values(response);
                expect(Array.isArray(response)).toBe(true);
                response.forEach(hash => {
                    expect(hash["id"]).toBeDefined();
                    expect(hash["hash"]).toBeDefined();
                    expect(hash["created_at"]).toBeDefined();
                    expect(hash["updated_at"]).toBeDefined();
                });
            });
    });
});
