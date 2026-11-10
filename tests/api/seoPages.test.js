import SeoPages from '../../src/api/v1/SeoPages.js';

describe('SeoPages', () => {
    test('get reads the public map', async () => {
        const client = { get: jest.fn().mockResolvedValue({ es: {} }) };
        await expect(new SeoPages(client).get()).resolves.toEqual({ es: {} });
        expect(client.get).toHaveBeenCalledWith('/seo-pages');
    });

    test('save upserts one landing and language', async () => {
        const client = { put: jest.fn().mockResolvedValue({}) };
        const body = { path: '/courses', lang: 'es', seo: { meta_title: 'x' } };
        await new SeoPages(client).save(body);
        expect(client.put).toHaveBeenCalledWith('/seo-pages', body);
    });
});
