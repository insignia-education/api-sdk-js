import './cookieJar.js';
import InsigniaApiV1 from '../../src/api/v1/index.js';

const api = new InsigniaApiV1(process.env.INSIGNIA_EDUCATION_API_BASE_URL);

beforeAll(async () => {
    await api.auth.login({
        email: process.env.TEST_EMAIL,
        password: process.env.TEST_PASSWORD,
    });
});

afterAll(async () => {
    await api.auth.logout();
});

// ─── Read-only endpoints ──────────────────────────────────────────────────────

describe('Countries', () => {
    test('get() returns a list', async () => {
        const res = await api.countries.get();
        const list = res?.data ?? res;
        expect(Array.isArray(list)).toBe(true);
    });
});

describe('Currencies', () => {
    test('get() returns a list', async () => {
        const res = await api.currencies.get();
        const list = res?.data ?? res;
        expect(Array.isArray(list)).toBe(true);
    });

    test('getValues() returns exchange values', async () => {
        const res = await api.currencies.getValues();
        expect(res).toBeDefined();
    });
});

describe('Languages', () => {
    test('get() returns a list', async () => {
        const res = await api.languages.get();
        const list = res?.data ?? res;
        expect(Array.isArray(list)).toBe(true);
    });
});

describe('Users', () => {
    test('get() returns a list', async () => {
        const res = await api.users.get();
        const list = res?.data ?? res;
        expect(Array.isArray(list)).toBe(true);
    });
});

describe('Courses', () => {
    test('get() returns a list', async () => {
        const res = await api.courses.get();
        const list = res?.data ?? res;
        expect(Array.isArray(list)).toBe(true);
    });
});
