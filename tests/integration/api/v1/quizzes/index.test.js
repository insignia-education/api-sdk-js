import { 
    api, 
    loginCustomer,
    loginAdmin
} from '../../../../helpers.js';
describe('api/v1/quizzes', () => {
    test('get | authenticated', async () => {
        await loginAdmin();
        await api.quizzes.get()
            .then(response => {
                response = Object.values(response);
                expect(Array.isArray(response)).toBe(true);
                response.forEach(quiz => {
                    expect(quiz["id"]).toBeDefined();
                    expect(quiz["created_at"]).toBeDefined();
                    expect(quiz["updated_at"]).toBeDefined();
                });
            });
    });

    test('get questions | authenticated', async () => {
        await loginAdmin();
        const quizzes = await api.quizzes.get().then(r => Object.values(r));
        if (quizzes.length === 0) return;
        const quizId = quizzes[0]["id"];
        await api.quizzes.questions(quizId).get()
            .then(response => {
                response = Object.values(response);
                expect(Array.isArray(response)).toBe(true);
                response.forEach(question => {
                    expect(question["id"]).toBeDefined();
                    expect(question["quiz_id"]).toBeDefined();
                    expect(question["question"]).toBeDefined();
                });
            });
    });
});
