import BugReports from '../../src/api/v1/BugReports.js';

describe('BugReports', () => {
    test('create() posts the body', async () => {
        const client = { post: jest.fn().mockResolvedValue({ id: 1 }) };
        const bugReports = new BugReports(client);
        const body = { title: 'Broken button', description: 'x', file_ids: [1] };

        await expect(bugReports.create(body)).resolves.toEqual({ id: 1 });
        expect(client.post).toHaveBeenCalledWith('/bug-reports', body);
    });

    test('list() sends tab/pagination params', async () => {
        const client = { get: jest.fn().mockResolvedValue({ data: [] }) };
        const bugReports = new BugReports(client);

        await bugReports.list({ tab: 'unassigned', page: 2 });
        expect(client.get).toHaveBeenCalledWith('/bug-reports', { tab: 'unassigned', page: 2 });
    });

    test('get() fetches by id', async () => {
        const client = { get: jest.fn().mockResolvedValue({ id: 5 }) };
        const bugReports = new BugReports(client);

        await bugReports.get(5);
        expect(client.get).toHaveBeenCalledWith('/bug-reports/5');
    });

    test('assign() patches assigned_user_id', async () => {
        const client = { patch: jest.fn().mockResolvedValue({}) };
        const bugReports = new BugReports(client);

        await bugReports.assign(5, 9);
        expect(client.patch).toHaveBeenCalledWith('/bug-reports/5/assign', { assigned_user_id: 9 });
    });

    test('updateStatus() patches the status body', async () => {
        const client = { patch: jest.fn().mockResolvedValue({}) };
        const bugReports = new BugReports(client);
        const body = { status: 'solved', solution: 'Fixed it.' };

        await bugReports.updateStatus(5, body);
        expect(client.patch).toHaveBeenCalledWith('/bug-reports/5/status', body);
    });

    test('statistics() fetches the aggregate endpoint', async () => {
        const client = { get: jest.fn().mockResolvedValue({ by_month: [] }) };
        const bugReports = new BugReports(client);

        await bugReports.statistics();
        expect(client.get).toHaveBeenCalledWith('/bug-reports/statistics');
    });

    test('exportUrl() builds a cookie-authenticated download link', () => {
        const client = { baseUrl: 'https://api.example.com' };
        const bugReports = new BugReports(client);

        expect(bugReports.exportUrl()).toBe('https://api.example.com/bug-reports/export?format=csv');
        expect(bugReports.exportUrl({ format: 'xlsx' })).toBe('https://api.example.com/bug-reports/export?format=xlsx');
    });
});
