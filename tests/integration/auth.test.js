import './cookieJar.js';
import InsigniaApiV1 from '../../src/api/v1/index.js';

const api = new InsigniaApiV1(process.env.INSIGNIA_EDUCATION_API_BASE_URL);

describe('Auth (integration)', () => {
    test('login returns token metadata and sets cookie', async () => {
        const res = await api.auth.login({
            email: process.env.TEST_EMAIL,
            password: process.env.TEST_PASSWORD,
        });
        const body = res?.response ?? res;
        expect(body.success).toBe('ok');
    });

    test('auth/user returns the authenticated user', async () => {
        const res = await api.auth.user();
        const body = res?.response ?? res;
        expect(body.email).toBe(process.env.TEST_EMAIL);
    });

    test('refresh returns new token metadata', async () => {
        const res = await api.auth.refresh();
        const body = res?.response ?? res;
        expect(body.token_type).toBe('bearer');
        expect(body.expires_in).toBeGreaterThan(0);
    });

    test('logout clears the session', async () => {
        const res = await api.auth.logout();
        const body = res?.response ?? res;
        expect(body.message).toBe('Successfully logged out');
    });

    test('auth/user returns 401 after logout', async () => {
        const res = await api.auth.user();
        const body = res?.response ?? res;
        expect(res?.status ?? body?.status).toBe(401);
    });
});
