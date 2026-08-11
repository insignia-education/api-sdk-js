import { api, loginAdmin } from '../../../helpers.js';

describe('api/v1/zoom/meetings', () => {
    test('get | authenticated', async () => {
        await loginAdmin();
        await api.zoom.meetings().get()
            .then(response => {
                response = Object.values(response);
                expect(Array.isArray(response)).toBe(true);
                response.forEach(meeting => {
                    expect(meeting["id"]).toBeDefined();
                    expect(meeting["created_at"]).toBeDefined();
                    expect(meeting["updated_at"]).toBeDefined();
                });
            });
    });
});
