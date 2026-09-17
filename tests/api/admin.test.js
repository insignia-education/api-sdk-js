import Admin from '../../src/api/v1/Admin.js';

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
