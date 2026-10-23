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

    test('salesGoals(id) reads a year of goals and upserts months', async () => {
        const client = {
            get: jest.fn().mockResolvedValue([]),
            put: jest.fn().mockResolvedValue([]),
        };
        const goals = new Users(client).salesGoals(7);

        await goals.get(2026);
        expect(client.get).toHaveBeenCalledWith('/users/7/sales-goals', { year: 2026 });

        await goals.edit(2026, [{ month: 1, amount: 500 }]);
        expect(client.put).toHaveBeenCalledWith('/users/7/sales-goals', { year: 2026, goals: [{ month: 1, amount: 500 }] });
    });
});
