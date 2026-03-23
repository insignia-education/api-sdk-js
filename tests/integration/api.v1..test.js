import './cookieJar.js';
import InsigniaApiV1 from '../../src/api/v1/index.js';

const api = new InsigniaApiV1(process.env.INSIGNIA_EDUCATION_API_BASE_URL);
beforeAll(async () => {
    const email = process.env.TEST_EMAIL;
    const password = process.env.TEST_PASSWORD;
    const login = await api.auth.login({ email, password });
});

afterAll(async () => {
    await api.auth.logout();
});

// ─── Read-only endpoints ──────────────────────────────────────────────────────
describe('Countries', () => {
    test('get() returns a list', async () => {
        api.countries.get()
        .then(response => {
            expect(response["11"]).toBeDefined();
            expect(response["11"]["id"]).toBeDefined();
            expect(response["11"]["cod"]).toBeDefined();
            expect(response["11"]["domain"]).toBeDefined();
            expect(response["11"]["phone_prefix"]).toBeDefined();
        });
    });
});

describe('Currencies', () => {
    test('get() returns a list', async () => {
        api.currencies.get()
        .then(response => {
            expect(response["1"]).toBeDefined();
            expect(response["1"]["id"]).toBeDefined();
            expect(response["1"]["country_id"]).toBeDefined();
            expect(response["1"]["cod"]).toBeDefined();
            expect(response["1"]["title"]).toBeDefined();
            expect(response["1"]["enabled"]).toBeDefined();
            expect(response["1"]["has_double_expression"]).toBeDefined();
            expect(response["1"]["double_expression_by"]).toBeDefined();
            expect(response["1"]["created_at"]).toBeDefined();
            expect(response["1"]["updated_at"]).toBeDefined();
            expect(response["1"]["deleted_at"]).toBeDefined();
        });
    });

    test('getValues() returns exchange values', async () => {
        const res = await api.currencies.getValues()
        .then(response => {
            expect(response["USD"]).toBeDefined();
            expect(response["USD"]["id"]).toBeDefined();
            expect(response["USD"]["currency_id"]).toBeDefined();
            expect(response["USD"]["value"]).toBeDefined();
            expect(response["USD"]["created_at"]).toBeDefined();
            expect(response["USD"]["updated_at"]).toBeDefined();
        });
    });
});

describe('Languages', () => {
    test('get() returns a list', async () => {
        const res = await api.languages.get()
        .then(response => {
            expect(response["1"]).toBeDefined();
            expect(response["1"]["id"]).toBeDefined();
            expect(response["1"]["iso"]).toBeDefined();
            expect(response["1"]["flag_emoji"]).toBeDefined();
            expect(response["1"]["enabled"]).toBeDefined();
            expect(response["1"]["default"]).toBeDefined();
            expect(response["1"]["created_at"]).toBeDefined();
            expect(response["1"]["updated_at"]).toBeDefined();
            expect(response["1"]["deleted_at"]).toBeDefined();
        });
    });
});



describe('Auth', () => {
    test('get() returns a list', async () => {
        const res = await api.auth.login({
            email: process.env.TEST_EMAIL,
            password: process.env.TEST_PASSWORD
        })
        .then(response => {
    
            expect(response["success"]).toBeDefined();
            expect(response["success"]).toBe("ok");
        });
    });
});

