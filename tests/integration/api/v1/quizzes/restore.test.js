import {
    api,
    loginAdmin,
} from '../../../../helpers.js';

describe('api/v1/quizzes restore()', () => {
    test('quiz: delete then restore brings it back into the normal list', async () => {
        await loginAdmin();
        const quiz = await api.quizzes.create({
            title: 'SDK restore test quiz',
            percentage_approval: 60,
            certification: false,
            contact_after_process: false,
        });

        await api.quizzes.delete(quiz.id);
        const restored = await api.quizzes.restore(quiz.id);
        expect(restored.id).toBe(quiz.id);
        expect(restored.deleted_at).toBeFalsy();

        const list = await api.quizzes.get().then(r => Object.values(r));
        expect(list.some(q => q.id === quiz.id)).toBe(true);
    });

    test('quiz: restoring an id that is not deleted rejects with 404', async () => {
        await loginAdmin();
        const quiz = await api.quizzes.create({
            title: 'SDK restore test quiz (not deleted)',
            percentage_approval: 60,
            certification: false,
            contact_after_process: false,
        });

        await expect(api.quizzes.restore(quiz.id)).rejects.toMatchObject({ status: 404 });
    });

    test('quiz: restore rejects unauthenticated', async () => {
        await api.auth.logout().catch(() => {});
        await expect(api.quizzes.restore(1)).rejects.toMatchObject({ status: 401 });
    });

    test('question/answer/criteria: delete then restore each brings it back', async () => {
        await loginAdmin();
        const quiz = await api.quizzes.create({
            title: 'SDK restore test quiz (nested)',
            percentage_approval: 60,
            certification: false,
            contact_after_process: false,
        });
        const question = await api.quizzes.questions(quiz.id).create({
            question: 'SDK restore test question',
            open: true,
            audio_answer: false,
            document_upload: false,
            public_link: false,
            enabled: true,
        });
        const answer = await api.quizzes.questions(quiz.id).answers(question.id).create({
            title: 'SDK restore test answer',
            is_correct: true,
        });
        const criteria = await api.quizzes.questions(quiz.id).criteria(question.id).create({
            title: 'SDK restore test criteria',
            max_score: 5,
        });

        await api.quizzes.questions(quiz.id).answers(question.id).delete(answer.id);
        await api.quizzes.questions(quiz.id).criteria(question.id).delete(criteria.id);
        await api.quizzes.questions(quiz.id).delete(question.id);

        const restoredQuestion = await api.quizzes.questions(quiz.id).restore(question.id);
        expect(restoredQuestion.id).toBe(question.id);
        expect(restoredQuestion.deleted_at).toBeFalsy();

        const restoredAnswer = await api.quizzes.questions(quiz.id).answers(question.id).restore(answer.id);
        expect(restoredAnswer.id).toBe(answer.id);
        expect(restoredAnswer.deleted_at).toBeFalsy();

        const restoredCriteria = await api.quizzes.questions(quiz.id).criteria(question.id).restore(criteria.id);
        expect(restoredCriteria.id).toBe(criteria.id);
        expect(restoredCriteria.deleted_at).toBeFalsy();
    });

    test('answer: restore rejects an answer id that belongs to another question', async () => {
        await loginAdmin();
        const quiz = await api.quizzes.create({
            title: 'SDK restore test quiz (cross-question)',
            percentage_approval: 60,
            certification: false,
            contact_after_process: false,
        });
        const question = await api.quizzes.questions(quiz.id).create({
            question: 'Question A', open: false, audio_answer: false, document_upload: false, public_link: false, enabled: true,
        });
        const otherQuestion = await api.quizzes.questions(quiz.id).create({
            question: 'Question B', open: false, audio_answer: false, document_upload: false, public_link: false, enabled: true,
        });
        const otherAnswer = await api.quizzes.questions(quiz.id).answers(otherQuestion.id).create({ title: 'Other answer', is_correct: false });
        await api.quizzes.questions(quiz.id).answers(otherQuestion.id).delete(otherAnswer.id);

        await expect(api.quizzes.questions(quiz.id).answers(question.id).restore(otherAnswer.id))
            .rejects.toMatchObject({ status: 404 });
    });
});
