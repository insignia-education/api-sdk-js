import {
    api,
    loginCustomer,
    logout,
} from '../../../helpers.js';

// Permission boundaries below the organization-and-above gate (plain customer/student,
// 403) are covered by the api repo's own PHPUnit suite (OrganizationControllerTest) —
// no test account below EMPLOYEE-tier is available in this environment's .env.test.
//
// Client#request() throws on non-2xx (err.status, err.data) rather than resolving —
// error cases below assert against a rejected promise, not a resolved {success,status}.

describe('api/v1/organizations', () => {
    test('get | unauthenticated', async () => {
        await expect(api.organizations.get()).rejects.toMatchObject({ status: 401 });
    });

    test('create | employee-and-above', async () => {
        await loginCustomer();
        const response = await api.organizations.create({ nice_name: 'SDK Test Org' });
        expect(response["id"]).toBeDefined();
        expect(response["nice_name"]).toBe('SDK Test Org');
        expect(response["user_id"]).toBeDefined();
    });

    test('get(id) | shape', async () => {
        await loginCustomer();
        const created = await api.organizations.create({ nice_name: 'SDK Test Org 2' });
        const response = await api.organizations.get(created.id);
        expect(response["id"]).toBe(created.id);
        expect(response["nice_name"]).toBe('SDK Test Org 2');
        expect(response["legal_name"]).toBeDefined();
        expect(response["fiscal_number"]).toBeDefined();
        expect(response["user_id"]).toBeDefined();
        expect(response["created_at"]).toBeDefined();
        expect(response["updated_at"]).toBeDefined();
    });

    test('edit', async () => {
        await loginCustomer();
        const created = await api.organizations.create({ nice_name: 'SDK Test Org 3' });
        const response = await api.organizations.edit(created.id, { nice_name: 'SDK Test Org 3 Edited' });
        expect(response["nice_name"]).toBe('SDK Test Org 3 Edited');
    });

    test('members(id).get() | empty for a freshly created organization', async () => {
        await loginCustomer();
        const created = await api.organizations.create({ nice_name: 'SDK Test Org 4' });
        const response = await api.organizations.members(created.id).get();
        expect(Object.values(response)).toEqual([]);
    });

    test('members(id).courses(userId) | rejects a non-member user_id', async () => {
        await loginCustomer();
        const created = await api.organizations.create({ nice_name: 'SDK Test Org 5' });
        await expect(api.organizations.members(created.id).courses(created.user_id))
            .rejects.toMatchObject({ status: 422 });
    });

    test('members(id).createPayment(userId, data) | reaches validation, not the OwnerOrStaff 403', async () => {
        await loginCustomer();
        const created = await api.organizations.create({ nice_name: 'SDK Test Org 6' });
        // Empty payload — asserts the route/method wiring bypasses OwnerOrStaff and lands
        // in UserPaymentCreateRequest validation (422), never a 403.
        await expect(api.organizations.members(created.id).createPayment(created.user_id, {}))
            .rejects.toMatchObject({ status: 422 });
    });
});

describe('api/v1/users/organization-owners', () => {
    test('get | unauthenticated', async () => {
        // Runs after earlier logged-in tests share this file's `api` client instance —
        // must explicitly log out, or its session cookie makes this look authenticated.
        await logout();
        await expect(api.users.organizationOwners()).rejects.toMatchObject({ status: 401 });
    });

    test('get | employee-and-above', async () => {
        await loginCustomer();
        const response = Object.values(await api.users.organizationOwners());
        expect(Array.isArray(response)).toBe(true);
        response.forEach(user => {
            expect(user["id"]).toBeDefined();
            expect(user["name"]).toBeDefined();
            expect(user["type_id"]).toBeDefined();
        });
    });
});
