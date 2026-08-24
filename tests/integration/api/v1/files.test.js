import { Blob } from 'buffer';
import { api, loginAdmin } from '../../../helpers.js';

// A real 1x1 transparent PNG (67 bytes) — the upload endpoint sniffs actual
// file content, not just the claimed Content-Type, so arbitrary text with an
// 'image/png' MIME hint gets rejected with "Unsupported file type".
const PNG_1X1 = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
    'base64'
);

describe('api/v1/files', () => {
    // list() (paginated), not get() — get(id) requires an id and hits
    // /files/{id}, unlike most other resources' get(id = null).
    test('list | authenticated', async () => {
        await loginAdmin();
        await api.files.list()
            .then(response => {
                const files = response["data"];
                expect(Array.isArray(files)).toBe(true);
                files.forEach(file => {
                    expect(file["id"]).toBeDefined();
                    expect(file["created_at"]).toBeDefined();
                    expect(file["updated_at"]).toBeDefined();
                });
            });
    });

    test('upload | authenticated', async () => {
        await loginAdmin();
        const blob = new Blob([PNG_1X1], { type: 'image/png' });
        const fd   = new FormData();
        fd.append('file', blob, 'test.png');
        fd.append('type', 'uploads');
        await api.files.upload(fd)
            .then(response => {
                expect(response).toBeDefined();
                expect(response['url']).toBeDefined();
                expect(response['id']).toBeDefined();
            });
    });

    // Only asserts the request is queued (pending) — the zip itself is built by
    // files:process-zip-requests, a cron command not running in this test stack
    // (see Dockerfile.test: php artisan serve only, no scheduler).
    test('zip | authenticated', async () => {
        await loginAdmin();
        await api.files.zip({ directory: '/' })
            .then(response => {
                expect(response['id']).toBeDefined();
                expect(response['status']).toBe('pending');
                expect(response['directory']).toBe('/');
            });
    });
});
