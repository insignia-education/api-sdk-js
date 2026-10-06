import Users from '../../src/api/v1/Users.js';

describe('Users', () => {
    test('assignableEmployees() fetches the employee-tier picker list', async () => {
        const client = { get: jest.fn().mockResolvedValue([]) };
        const users = new Users(client);

        await users.assignableEmployees();
        expect(client.get).toHaveBeenCalledWith('/users/assignable-employees');
    });

    test('tutorials(id) lists, reads one by code, and marks viewed', async () => {
        const client = {
            get: jest.fn().mockResolvedValue([]),
            post: jest.fn().mockResolvedValue({ status: 'viewed' }),
        };
        const tutorials = new Users(client).tutorials(7);

        await tutorials.get();
        expect(client.get).toHaveBeenCalledWith('/users/7/tutorials');

        await tutorials.status('dashboard-student');
        expect(client.get).toHaveBeenCalledWith('/users/7/tutorials/dashboard-student');

        await tutorials.markViewed('dashboard-student');
        expect(client.post).toHaveBeenCalledWith('/users/7/tutorials/dashboard-student/viewed');
    });
});
