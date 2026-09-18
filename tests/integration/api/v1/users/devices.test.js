import {
    api,
    loginCustomer,
    loginAdmin,
    logout,
} from '../../../../helpers.js';

describe('api/v1/users/{id}/devices', () => {
    // A real login (loginCustomer()) creates a device row for the session it just
    // opened — see UserDeviceService::recordLogin() in `api`. This is the one SDK
    // integration test that can exercise a genuinely "current" device, since it's
    // the only place these tests actually go through the real login endpoint.
    test('get | owner sees their own current device', async () => {
        await loginCustomer();
        const me = await api.users.get();

        const devices = await api.users.devices(me['id']).get();

        expect(Array.isArray(devices)).toBe(true);
        expect(devices.length).toBeGreaterThan(0);
        const current = devices.find((d) => d.is_current);
        expect(current).toBeDefined();
        expect(current.jti).toBeUndefined();
    });

    test('get | unauthenticated is rejected', async () => {
        await logout();
        await expect(api.users.devices(1).get()).rejects.toMatchObject({ status: 401 });
    });

    test('get | staff (admin) can list another user\'s devices', async () => {
        await loginCustomer();
        const customer = await api.users.get();

        await loginAdmin();
        await expect(api.users.devices(customer['id']).get()).resolves.toBeDefined();
    });

    test('delete | unknown device id is a 404', async () => {
        await loginCustomer();
        const me = await api.users.get();

        await expect(api.users.devices(me['id']).delete(999999999)).rejects.toMatchObject({ status: 404 });
    });

    test('delete | revoking the current device logs it out (subsequent call is 401)', async () => {
        await loginCustomer();
        const me = await api.users.get();
        const devices = await api.users.devices(me['id']).get();
        const current = devices.find((d) => d.is_current);

        await api.users.devices(me['id']).delete(current['id']);

        await expect(api.users.get()).rejects.toMatchObject({ status: 401 });
    });

    test('deleteAll | keeps the caller\'s own session working', async () => {
        await loginCustomer();
        const me = await api.users.get();

        await api.users.devices(me['id']).deleteAll();

        await expect(api.users.get()).resolves.toBeDefined();
    });
});
