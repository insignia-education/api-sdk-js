import { randomUUID } from 'node:crypto';
import { api, loginCustomer } from '../../../helpers.js';

const base = () => ({ landingId: randomUUID(), source: 'site', path: '/es/courses' });

describe('api/v1/analytics', () => {
    test('view | unauthenticated', async () => {
        const response = await api.analytics.view({ ...base(), title: 'Courses', referrer: 'https://www.google.com/', utm: { source: 'newsletter' }, language: 'es', screenWidth: 390, screenHeight: 844 });
        expect(response.recorded ?? response.response?.recorded).toBe(true);
    });

    test('view | authenticated user is accepted too', async () => {
        await loginCustomer();
        const response = await api.analytics.view(base());
        expect(response.recorded ?? response.response?.recorded).toBe(true);
    });

    test.each([
        ['landingId', { landingId: undefined }],
        ['source', { source: undefined }],
        ['path', { path: undefined }],
    ])('view | missing %s is a validation error', async (_name, override) => {
        await expect(api.analytics.view({ ...base(), ...override })).rejects.toMatchObject({ status: 422 });
    });

    test.each([
        ['landingId not a uuid', { landingId: 'nope' }],
        ['source not allowed', { source: 'mobile-app' }],
        ['path too long', { path: 'a'.repeat(513) }],
        ['screenWidth negative', { screenWidth: -1 }],
    ])('view | wrong format: %s', async (_name, override) => {
        await expect(api.analytics.view({ ...base(), ...override })).rejects.toMatchObject({ status: 422 });
    });

    test.each(['accepted', 'rejected'])('consent | %s', async (consent) => {
        const response = await api.analytics.consent({ ...base(), consent });
        expect(response.recorded ?? response.response?.recorded).toBe(true);
    });

    test.each([
        ['landingId', { landingId: undefined }],
        ['source', { source: undefined }],
        ['consent', { consent: undefined }],
    ])('consent | missing %s is a validation error', async (_name, override) => {
        await expect(api.analytics.consent({ ...base(), consent: 'accepted', ...override })).rejects.toMatchObject({ status: 422 });
    });

    test('consent | value not allowed', async () => {
        await expect(api.analytics.consent({ ...base(), consent: 'maybe' })).rejects.toMatchObject({ status: 422 });
    });
});
