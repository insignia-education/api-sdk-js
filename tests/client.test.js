import InsigniaClient from '../src/Client.js';
import Users from '../src/api/v1/Users.js';

const BASE = 'http://localhost:8000';

function mockFetch(json = {}) {
    return jest.fn().mockResolvedValue({ ok: true, status: 200, json: () => Promise.resolve(json) });
}

beforeEach(() => {
    delete process.env.INSIGNIA_EDUCATION_API_BASE_URL;
});

afterEach(() => {
    delete global.fetch;
    delete process.env.INSIGNIA_EDUCATION_API_BASE_URL;
});

// ─── baseUrl resolution ───────────────────────────────────────────────────────

describe('baseUrl resolution', () => {
    test('uses explicit baseUrl when provided', async () => {
        global.fetch = mockFetch();
        const client = new InsigniaClient('https://custom.example.com');
        await client.get('/test');
        expect(global.fetch).toHaveBeenCalledWith(
            'https://custom.example.com/test',
            expect.any(Object)
        );
    });

    test('strips trailing slash from explicit baseUrl', async () => {
        global.fetch = mockFetch();
        const client = new InsigniaClient('https://custom.example.com/');
        await client.get('/test');
        expect(global.fetch).toHaveBeenCalledWith(
            'https://custom.example.com/test',
            expect.any(Object)
        );
    });

    test('uses INSIGNIA_EDUCATION_API_BASE_URL env var when baseUrl is null', async () => {
        process.env.INSIGNIA_EDUCATION_API_BASE_URL = 'https://env.example.com';
        global.fetch = mockFetch();
        const client = new InsigniaClient(null);
        await client.get('/test');
        expect(global.fetch).toHaveBeenCalledWith(
            'https://env.example.com/test',
            expect.any(Object)
        );
    });

    test('baseUrl getter exposes the resolved base URL', () => {
        const client = new InsigniaClient('https://custom.example.com/');
        expect(client.baseUrl).toBe('https://custom.example.com');
    });

    test('falls back to https://insigniaeducation.com when baseUrl is null and env var is not set', async () => {
        global.fetch = mockFetch();
        const client = new InsigniaClient(null);
        await client.get('/test');
        expect(global.fetch).toHaveBeenCalledWith(
            'https://insigniaeducation.com/test',
            expect.any(Object)
        );
    });

    test('falls back to default when constructed with no arguments', async () => {
        global.fetch = mockFetch();
        const client = new InsigniaClient();
        await client.get('/test');
        expect(global.fetch).toHaveBeenCalledWith(
            'https://insigniaeducation.com/test',
            expect.any(Object)
        );
    });

    test('explicit baseUrl takes precedence over env var', async () => {
        process.env.INSIGNIA_EDUCATION_API_BASE_URL = 'https://env.example.com';
        global.fetch = mockFetch();
        const client = new InsigniaClient('https://explicit.example.com');
        await client.get('/test');
        expect(global.fetch).toHaveBeenCalledWith(
            'https://explicit.example.com/test',
            expect.any(Object)
        );
    });

    test('falls back to default when process is undefined', async () => {
        const saved = global.process;
        global.process = undefined;
        global.fetch = mockFetch();
        const client = new InsigniaClient(null);
        await client.get('/test');
        expect(global.fetch).toHaveBeenCalledWith(
            'https://insigniaeducation.com/test',
            expect.any(Object)
        );
        global.process = saved;
    });
});

// ─── HTTP methods ─────────────────────────────────────────────────────────────

describe('HTTP methods', () => {
    let client;

    beforeEach(() => {
        global.fetch = mockFetch();
        client = new InsigniaClient(BASE);
    });

    test('get() sends GET with no body', async () => {
        await client.get('/path');
        const [url, options] = global.fetch.mock.calls[0];
        expect(url).toBe(`${BASE}/path`);
        expect(options.method).toBe('GET');
        expect(options.body).toBeUndefined();
    });

    test('post() sends POST with body', async () => {
        await client.post('/path', { key: 'val' });
        const [url, options] = global.fetch.mock.calls[0];
        expect(url).toBe(`${BASE}/path`);
        expect(options.method).toBe('POST');
        expect(options.body).toBe(JSON.stringify({ key: 'val' }));
    });

    test('post() sends POST with no body when not provided', async () => {
        await client.post('/path');
        const [, options] = global.fetch.mock.calls[0];
        expect(options.method).toBe('POST');
        expect(options.body).toBeUndefined();
    });

    test('put() sends PUT with body', async () => {
        await client.put('/path', { key: 'val' });
        const [url, options] = global.fetch.mock.calls[0];
        expect(url).toBe(`${BASE}/path`);
        expect(options.method).toBe('PUT');
        expect(options.body).toBe(JSON.stringify({ key: 'val' }));
    });

    test('put() sends PUT with no body when not provided', async () => {
        await client.put('/path');
        const [, options] = global.fetch.mock.calls[0];
        expect(options.method).toBe('PUT');
        expect(options.body).toBeUndefined();
    });

    test('patch() sends PATCH with body', async () => {
        await client.patch('/path', { key: 'val' });
        const [url, options] = global.fetch.mock.calls[0];
        expect(url).toBe(`${BASE}/path`);
        expect(options.method).toBe('PATCH');
        expect(options.body).toBe(JSON.stringify({ key: 'val' }));
    });

    test('patch() sends PATCH with no body when not provided', async () => {
        await client.patch('/path');
        const [, options] = global.fetch.mock.calls[0];
        expect(options.method).toBe('PATCH');
        expect(options.body).toBeUndefined();
    });

    test('del() sends DELETE with no body', async () => {
        await client.del('/path');
        const [url, options] = global.fetch.mock.calls[0];
        expect(url).toBe(`${BASE}/path`);
        expect(options.method).toBe('DELETE');
        expect(options.body).toBeUndefined();
    });

    test('JSON headers are always sent', async () => {
        await client.get('/path');
        const [, options] = global.fetch.mock.calls[0];
        expect(options.headers.Accept).toBe('application/json');
        expect(options.headers['Content-Type']).toBe('application/json');
    });

    test('credentials is always include', async () => {
        await client.get('/path');
        const [, options] = global.fetch.mock.calls[0];
        expect(options.credentials).toBe('include');
    });

    test('stores response cookies and sends them on later requests in Node', async () => {
        global.fetch = jest.fn()
            .mockResolvedValueOnce({
                ok: true,
                status: 200,
                headers: {
                    getSetCookie: () => ['token=abc123; Path=/; HttpOnly; Secure; SameSite=Lax'],
                },
                json: () => Promise.resolve({ success: 'ok' }),
            })
            .mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ id: 1, title: 'test' }),
            });
        client = new InsigniaClient(BASE);

        await client.post('/auth/login', { email: 'admin@example.com', password: 'secret' });
        await client.get('/accounts');

        const [, options] = global.fetch.mock.calls[1];
        expect(options.headers.Cookie).toBe('token=abc123');
    });

    test('returns parsed JSON from response', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve({ id: 1, name: 'test' }),
        });
        client = new InsigniaClient(BASE);
        const result = await client.get('/path');
        expect(result).toEqual({ id: 1, name: 'test' });
    });

    test('returns null for empty response text', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            status: 200,
            text: () => Promise.resolve(''),
        });
        client = new InsigniaClient(BASE);
        const result = await client.get('/path');
        expect(result).toBeNull();
    });

    test('returns null for no-content responses', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            status: 204,
            json: jest.fn(),
        });
        client = new InsigniaClient(BASE);
        const result = await client.del('/path');
        expect(result).toBeNull();
    });

    test('returns null when json parsing fails because the response is empty', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.reject(new SyntaxError('Unexpected end of JSON input')),
        });
        client = new InsigniaClient(BASE);
        const result = await client.get('/path');
        expect(result).toBeNull();
    });
});

// ─── getCookie / setCookie ─────────────────────────────────────────────────────

describe('getCookie / setCookie', () => {
    test('getCookie returns null when the cookie was never set', () => {
        const client = new InsigniaClient(BASE);
        expect(client.getCookie('token')).toBeNull();
    });

    test('setCookie seeds a cookie that is sent on the next request', async () => {
        global.fetch = mockFetch();
        const client = new InsigniaClient(BASE);
        client.setCookie('token', 'abc123');

        await client.get('/path');

        const [, options] = global.fetch.mock.calls[0];
        expect(options.headers.Cookie).toBe('token=abc123');
    });

    test('getCookie reads back a cookie captured from a response', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            status: 200,
            headers: { getSetCookie: () => ['token=abc123; Path=/; HttpOnly'] },
            json: () => Promise.resolve({ success: 'ok' }),
        });
        const client = new InsigniaClient(BASE);

        await client.post('/auth/login', { email: 'admin@example.com', password: 'secret' });

        expect(client.getCookie('token')).toBe('abc123');
    });
});

// ─── payments(userId).invoiceUrl ──────────────────────────────────────────────
// A direct link, not a fetch — no HTTP call to mock/assert on, just the URL shape.

describe('Users.payments(userId).invoiceUrl', () => {
    test('builds a direct link to the invoice endpoint', () => {
        const client = new InsigniaClient(BASE);
        const users = new Users(client);
        expect(users.payments(42).invoiceUrl(7)).toBe(`${BASE}/users/42/payments/7/invoice`);
    });
});
