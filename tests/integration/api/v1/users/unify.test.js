import {
    api,
    loginAdmin,
    logout,
} from '../../../../helpers.js';

// Permission boundaries (below sales-tier, 403) are covered by the api repo's own
// PHPUnit suite (UserUnifyControllerTest) — no test account below EMPLOYEE-tier is
// available in this environment's .env.test. See organizations.test.js for the same
// convention. Client#request() throws on non-2xx — error cases assert a rejected
// promise, not a resolved {success,status}.

// @gmail.com, not @example.com — UserCreateRequest validates email:rfc,dns, and
// example.com has no MX record, so it fails DNS validation regardless of network access.
const newUserPayload = (label) => ({
    email: `sdk-unify-${label}-${Date.now()}-${Math.random().toString(36).slice(2)}@gmail.com`,
    password: 'Str0ng!Passw0rd',
    password_confirmation: 'Str0ng!Passw0rd',
    name: `SDK Unify ${label}`,
    birth_date: '2000-01-01',
});

describe('api/v1/users unify', () => {
    test('unify(fromId, toId) | merges from into to, blocks + blacklists from', async () => {
        await loginAdmin();
        const from = await api.users.create(newUserPayload('from'));
        const to = await api.users.create(newUserPayload('to'));

        const response = await api.users.unify(from.id, to.id);
        expect(response["id"]).toBe(to.id);
        expect(response["user_unified_from_id"]).toBe(from.id);

        const fromAfter = await api.users.get(from.id);
        expect(fromAfter["blocked_at"]).not.toBeNull();
        expect(fromAfter["user_unified_to_id"]).toBe(to.id);
    });

    test('unify(fromId, toId) | rejects unifying a user with itself', async () => {
        await loginAdmin();
        const from = await api.users.create(newUserPayload('self'));
        await expect(api.users.unify(from.id, from.id)).rejects.toMatchObject({ status: 422 });
    });

    test('unify(fromId, toId) | rejects a non-existent to_id', async () => {
        await loginAdmin();
        const from = await api.users.create(newUserPayload('badto'));
        await expect(api.users.unify(from.id, 999999999)).rejects.toMatchObject({ status: 422 });
    });

    test('unify | unauthenticated', async () => {
        await loginAdmin();
        const from = await api.users.create(newUserPayload('unauth-from'));
        const to = await api.users.create(newUserPayload('unauth-to'));
        await logout();
        await expect(api.users.unify(from.id, to.id)).rejects.toMatchObject({ status: 401 });
    });
});
