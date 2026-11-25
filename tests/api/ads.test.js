import Ads from '../../src/api/v1/Ads.js';
import Courses from '../../src/api/v1/Courses.js';

describe('Ads', () => {
    test('get() without id or paging lists every ad', async () => {
        const client = { get: jest.fn().mockResolvedValue([{ id: 1 }]) };
        await expect(new Ads(client).get()).resolves.toEqual([{ id: 1 }]);
        expect(client.get).toHaveBeenCalledWith('/ads');
    });

    test('get() with paging passes page/per_page/search', async () => {
        const client = { get: jest.fn().mockResolvedValue({}) };
        await new Ads(client).get(null, { search: 'spring', page: 2, perPage: 5 });
        expect(client.get).toHaveBeenCalledWith('/ads', { search: 'spring', page: 2, per_page: 5 });
    });

    test('get(id) reads one ad', async () => {
        const client = { get: jest.fn().mockResolvedValue({ id: 4 }) };
        await new Ads(client).get(4);
        expect(client.get).toHaveBeenCalledWith('/ads/4');
    });

    test('create / edit / delete hit PUT / PATCH / DELETE', async () => {
        const client = { put: jest.fn(), patch: jest.fn(), del: jest.fn() };
        const ads = new Ads(client);
        await ads.create({ title: 'a' });
        await ads.edit(3, { title: 'b' });
        await ads.delete(3);
        expect(client.put).toHaveBeenCalledWith('/ads', { title: 'a' });
        expect(client.patch).toHaveBeenCalledWith('/ads/3', { title: 'b' });
        expect(client.del).toHaveBeenCalledWith('/ads/3');
    });

    test('lesson serveAd posts the language', async () => {
        const client = { post: jest.fn().mockResolvedValue({ ad: null }) };
        await expect(new Courses(client).levels(7).lessons(2).serveAd(9, 'pt')).resolves.toEqual({ ad: null });
        expect(client.post).toHaveBeenCalledWith('/courses/7/levels/2/lessons/9/ad', { language: 'pt' });
    });
});
