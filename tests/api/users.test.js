import Users from '../../src/api/v1/Users.js';

describe('Users', () => {
    test('assignableEmployees() fetches the employee-tier picker list', async () => {
        const client = { get: jest.fn().mockResolvedValue([]) };
        const users = new Users(client);

        await users.assignableEmployees();
        expect(client.get).toHaveBeenCalledWith('/users/assignable-employees');
    });
});
