import InsigniaApiV1 from '../../../../src/api/v1/index.js';

const api = new InsigniaApiV1(process.env.INSIGNIA_EDUCATION_API_BASE_URL);

describe('api/v1/conversational-topics', () => {
    test('get', async () => {
        await api.conversationalTopics.get()
            .then(response => {
                response = Object.values(response);
                expect(response.length > 0).toBe(true);
                response.forEach(topic => {
                    expect(topic["id"]).toBeDefined();
                    expect(topic["cod"]).toBeDefined();
                    expect(topic["title"]).toBeDefined();
                    expect(topic["enabled"]).toBeDefined();
                });
            });
    });
});
