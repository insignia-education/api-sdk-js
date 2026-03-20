import InsigniaClient from '../src/Client.js';

const BASE = 'http://localhost:8000';

function mockFetch(json = {}) {
    return jest.fn().mockResolvedValue({ json: () => Promise.resolve(json) });
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
});

// ─── token management ────────────────────────────────────────────────────────

describe('token management', () => {
    test('getToken returns null by default', () => {
        const client = new InsigniaClient();
        expect(client.getToken()).toBeNull();
    });

    test('getToken returns token passed to constructor', () => {
        const client = new InsigniaClient(null, 'my-token');
        expect(client.getToken()).toBe('my-token');
    });

    test('setToken updates the token', () => {
        const client = new InsigniaClient();
        client.setToken('new-token');
        expect(client.getToken()).toBe('new-token');
    });

    test('Authorization header is never sent (cookie-based auth)', async () => {
        global.fetch = mockFetch();
        const client = new InsigniaClient(null, 'some-token');
        await client.get('/test');
        const [, options] = global.fetch.mock.calls[0];
        expect(options.headers['Authorization']).toBeUndefined();
    });
});

// ─── HTTP methods ─────────────────────────────────────────────────────────────

describe('HTTP methods', () => {
    let client;

    beforeEach(() => {
        global.fetch = mockFetch({ ok: true });
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

    test('Content-Type is always application/json', async () => {
        await client.get('/path');
        const [, options] = global.fetch.mock.calls[0];
        expect(options.headers['Content-Type']).toBe('application/json');
    });

    test('credentials is always include', async () => {
        await client.get('/path');
        const [, options] = global.fetch.mock.calls[0];
        expect(options.credentials).toBe('include');
    });

    test('returns parsed JSON from response', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve({ id: 1, name: 'test' }),
        });
        client = new InsigniaClient(BASE);
        const result = await client.get('/path');
        expect(result).toEqual({ id: 1, name: 'test' });
    });
});
