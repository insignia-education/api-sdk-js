import { Blob } from 'buffer';
import InsigniaApiV1 from '../../../../src/api/v1/index.js';

const api = new InsigniaApiV1(process.env.INSIGNIA_EDUCATION_API_BASE_URL);

const login = () => api.auth.login({
    email: process.env.TEST_EMAIL,
    password: process.env.TEST_PASSWORD,
});

describe('api/v1/files', () => {
    test('get | authenticated', async () => {
        await login();
        await api.files.get()
            .then(response => {
                response = Object.values(response);
                expect(Array.isArray(response)).toBe(true);
                response.forEach(file => {
                    expect(file["id"]).toBeDefined();
                    expect(file["created_at"]).toBeDefined();
                    expect(file["updated_at"]).toBeDefined();
                });
            });
    });

    test('upload | authenticated', async () => {
        await login();
        const blob = new Blob(['test'], { type: 'image/png' });
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
});
