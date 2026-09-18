import Search from '../../src/api/v1/Search.js';

describe('Search', () => {
    test('query() omits optional flags by default', async () => {
        const client = { get: jest.fn().mockResolvedValue({ users: [], courses: [] }) };
        const search = new Search(client);

        await search.query('ad');
        expect(client.get).toHaveBeenCalledWith('/search', {
            q: 'ad', offset: 0, include_trashed: undefined, unblocked_only: undefined,
        });
    });

    test('query() sends unblocked_only=1 when requested', async () => {
        const client = { get: jest.fn().mockResolvedValue({ users: [], courses: [] }) };
        const search = new Search(client);

        await search.query('ad', 0, false, true);
        expect(client.get).toHaveBeenCalledWith('/search', {
            q: 'ad', offset: 0, include_trashed: undefined, unblocked_only: 1,
        });
    });
});
