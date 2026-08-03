import { 
    api
} from '../../../helpers.js';

describe('api/v1/categories', () => {
    test('get', async () => {
        await api.categories.get()
            .then(response => {
                response = Object.values(response);
                expect(response.length > 0).toBe(true);
                response.forEach(category => {
                    expect(category["id"]).toBeDefined();
                    expect(category["cod"]).toBeDefined();
                    expect(category["title"]).toBeDefined();
                    expect(category["enabled"]).toBeDefined();
                });
            });
    });
});
