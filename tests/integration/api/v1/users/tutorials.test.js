import {
    api,
    loginCustomer,
    loginAdmin,
    logout,
} from '../../../../helpers.js';

describe('api/v1/users/{id}/tutorials', () => {
    test('get | lists every known tutorial with a status', async () => {
        await loginCustomer();
        const me = await api.users.get();

        const tutorials = await api.users.tutorials(me['id']).get();

        expect(Array.isArray(tutorials)).toBe(true);
        const dashboard = tutorials.find((t) => t.code === 'dashboard-student');
        expect(dashboard).toBeDefined();
        expect(['pending', 'viewed']).toContain(dashboard.status);
    });

    test('markViewed | flips the status to viewed and stays viewed', async () => {
        await loginCustomer();
        const me = await api.users.get();

        const marked = await api.users.tutorials(me['id']).markViewed('dashboard-student');
        expect(marked.status).toBe('viewed');

        // idempotent
        await expect(api.users.tutorials(me['id']).markViewed('dashboard-student')).resolves.toMatchObject({ status: 'viewed' });
        await expect(api.users.tutorials(me['id']).status('dashboard-student')).resolves.toMatchObject({ code: 'dashboard-student', status: 'viewed' });
    });

    test('status | unknown code is a 404', async () => {
        await loginCustomer();
        const me = await api.users.get();

        await expect(api.users.tutorials(me['id']).status('nope')).rejects.toMatchObject({ status: 404 });
        await expect(api.users.tutorials(me['id']).markViewed('nope')).rejects.toMatchObject({ status: 404 });
    });

    test('get | unauthenticated is rejected', async () => {
        await logout();
        await expect(api.users.tutorials(1).get()).rejects.toMatchObject({ status: 401 });
    });

    test('get | staff (admin) can read another user\'s tutorials', async () => {
        await loginCustomer();
        const customer = await api.users.get();

        await loginAdmin();
        await expect(api.users.tutorials(customer['id']).get()).resolves.toBeDefined();
    });
});
