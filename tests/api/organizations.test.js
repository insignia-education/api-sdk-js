import Organizations from '../../src/api/v1/Organizations.js';

describe('Organizations', () => {
    test('members(id).remove(userId) sends the scoped DELETE request', async () => {
        const client = { del: jest.fn().mockResolvedValue(true) };
        const organizations = new Organizations(client);

        await expect(organizations.members(7).remove(42)).resolves.toBe(true);
        expect(client.del).toHaveBeenCalledWith('/organizations/7/members/42');
    });
});
