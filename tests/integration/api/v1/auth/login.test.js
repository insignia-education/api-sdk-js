import {
    api,
    loginAdmin,
} from '../../../../helpers.js';

describe('api/v1/auth/login', () => {
    // Client#request() throws on non-2xx (err.status, err.data) rather than
    // resolving — assert against a rejected promise, not a resolved
    // {success, status, errors}. Also no logout() before these — a fresh
    // `api` client (one per test file) starts out unauthenticated, and
    // logout() itself throws 401 when there's no session to clear.
    test('POST | failure | no email validation', async () => {
        const password = process.env.TEST_PASSWORD;
        await expect(api.auth.login({ password })).rejects.toMatchObject({
            status: 422,
            data: { errors: expect.objectContaining({ email: expect.anything() }) },
        });
    });

    test('POST | failure | no password validation', async () => {
        const email = process.env.TEST_EMAIL;
        await expect(api.auth.login({ email })).rejects.toMatchObject({
            status: 422,
            data: { errors: expect.objectContaining({ password: expect.anything() }) },
        });
    });

    test('POST | success', async () => {
        await loginAdmin()
            .then(response => {
                expect(response["success"]).toBeDefined();
                expect(response["success"]).toBe("ok");
            });
    });

    test('POST | double login', async () => {
        await loginAdmin()
        .then(() => loginAdmin()
            .then(response => {
                expect(response["success"]).toBeDefined();
                expect(response["success"]).toBe("ok");
            }));
    });
});
