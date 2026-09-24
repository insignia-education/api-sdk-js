import Admin from '../../src/api/v1/Admin.js';

describe('Admin quizzesUngraded', () => {
    test('passes course/search/pagination filters through', async () => {
        const client = { get: jest.fn().mockResolvedValue({ data: [] }) };
        const admin = new Admin(client);

        await expect(admin.quizzesUngraded({ courseId: 5, search: 'jane', page: 2, perPage: 10 }))
            .resolves.toEqual({ data: [] });
        expect(client.get).toHaveBeenCalledWith('/admin/quizzes/ungraded', {
            course_id: 5, search: 'jane', page: 2, per_page: 10,
        });
    });

    test('omits optional filters when not given', async () => {
        const client = { get: jest.fn().mockResolvedValue({ data: [] }) };
        const admin = new Admin(client);

        await admin.quizzesUngraded();
        expect(client.get).toHaveBeenCalledWith('/admin/quizzes/ungraded', {
            course_id: undefined, search: undefined, page: undefined, per_page: undefined,
        });
    });
});

describe('Admin GitHub pull request methods', () => {
    test('fetches pull request review context', async () => {
        const client = { get: jest.fn().mockResolvedValue({ number: 104 }) };
        const admin = new Admin(client);

        await expect(admin.actionsPullRequest('api', 104)).resolves.toEqual({ number: 104 });
        expect(client.get).toHaveBeenCalledWith('/admin/actions/api/pulls/104');
    });

    test('merges the exact reviewed SHA with the selected method', async () => {
        const client = { post: jest.fn().mockResolvedValue({ merged: true }) };
        const admin = new Admin(client);
        const sha = 'a'.repeat(40);

        await expect(admin.actionsMergePullRequest('api', 104, { sha, mergeMethod: 'squash' }))
            .resolves.toEqual({ merged: true });
        expect(client.post).toHaveBeenCalledWith('/admin/actions/api/pulls/104/merge', {
            sha,
            merge_method: 'squash',
        });
    });
});

describe('Admin reportsOpenAiUsage', () => {
    test('passes date filters through', async () => {
        const client = { get: jest.fn().mockResolvedValue({ available: true }) };
        const admin = new Admin(client);

        await expect(admin.reportsOpenAiUsage({ fromDate: '2026-09-01', toDate: '2026-09-24' }))
            .resolves.toEqual({ available: true });
        expect(client.get).toHaveBeenCalledWith('/admin/reports/openai-usage', {
            from_date: '2026-09-01',
            to_date: '2026-09-24',
        });
    });

    test('supports the API defaults when dates are omitted', async () => {
        const client = { get: jest.fn().mockResolvedValue({ available: false }) };
        const admin = new Admin(client);

        await admin.reportsOpenAiUsage();

        expect(client.get).toHaveBeenCalledWith('/admin/reports/openai-usage', {
            from_date: undefined,
            to_date: undefined,
        });
    });
});
