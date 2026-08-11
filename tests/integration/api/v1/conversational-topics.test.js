import { api, loginAdmin } from '../../../helpers.js';

describe('api/v1/conversational-topics', () => {
    test('get', async () => {
        await loginAdmin();
        await api.conversationalTopics.get()
            .then(response => {
                response = Object.values(response);
                expect(response.length > 0).toBe(true);
                response.forEach(topic => {
                    expect(topic["id"]).toBeDefined();
                    expect(topic["title"]).toBeDefined();
                    expect(topic["date"]).toBeDefined();
                });
            });
    });
});
