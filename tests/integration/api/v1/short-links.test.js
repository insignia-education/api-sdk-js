import { api, loginAdmin } from '../../../helpers.js';

describe('api/v1/short-links', () => {
    test('get | authenticated', async () => {
        await loginAdmin();
        await api.shortLinks.get()
            .then(response => {
                response = Object.values(response);
                expect(Array.isArray(response)).toBe(true);
                response.forEach(link => {
                    expect(link["id"]).toBeDefined();
                    expect(link["cod"]).toBeDefined();
                    expect(link["url"]).toBeDefined();
                    expect(link["enabled"]).toBeDefined();
                    expect(link["created_at"]).toBeDefined();
                    expect(link["updated_at"]).toBeDefined();
                });
            });
    });
});
