import { 
    api, 
    loginCustomer,
    loginAdmin
} from '../../../../helpers.js';

describe('api/v1/surveys', () => {
    test('get | authenticated', async () => {
        await loginCustomer();
        await api.surveys.get()
            .then(response => {
                response = Object.values(response);
                expect(Array.isArray(response)).toBe(true);
                response.forEach(survey => {
                    expect(survey["id"]).toBeDefined();
                    expect(survey["cod"]).toBeDefined();
                    expect(survey["enabled"]).toBeDefined();
                    expect(survey["created_at"]).toBeDefined();
                    expect(survey["updated_at"]).toBeDefined();
                });
            });
    });

    test('get questions | authenticated', async () => {
        await loginCustomer();
        const surveys = await api.surveys.get().then(r => Object.values(r));
        if (surveys.length === 0) return;
        const surveyId = surveys[0]["id"];
        await api.surveys.questions(surveyId).get()
            .then(response => {
                response = Object.values(response);
                expect(Array.isArray(response)).toBe(true);
                response.forEach(question => {
                    expect(question["id"]).toBeDefined();
                    expect(question["survey_id"]).toBeDefined();
                    expect(question["question"]).toBeDefined();
                });
            });
    });
});
