import Courses from '../../src/api/v1/Courses.js';

describe.each([
    ['audioTracks', 'audio-tracks'],
    ['subtitles', 'subtitles'],
])('Courses lesson %s', (method, path) => {
    const base = `/courses/1/levels/2/lessons/3/${path}`;
    const setup = () => {
        const client = {
            get: jest.fn().mockResolvedValue([]),
            put: jest.fn().mockResolvedValue({}),
            patch: jest.fn().mockResolvedValue({}),
            del: jest.fn().mockResolvedValue(true),
        };
        return { client, tracks: new Courses(client).levels(1).lessons(2)[method](3) };
    };

    test('get() lists the lesson tracks', async () => {
        const { client, tracks } = setup();
        await tracks.get();
        expect(client.get).toHaveBeenCalledWith(base);
    });

    test('create() PUTs to the collection', async () => {
        const { client, tracks } = setup();
        await tracks.create({ language_id: 1, url: 'u' });
        expect(client.put).toHaveBeenCalledWith(base, { language_id: 1, url: 'u' });
    });

    test('edit() PATCHes the member', async () => {
        const { client, tracks } = setup();
        await tracks.edit(9, { enabled: false });
        expect(client.patch).toHaveBeenCalledWith(`${base}/9`, { enabled: false });
    });

    test('delete() DELETEs the member', async () => {
        const { client, tracks } = setup();
        await tracks.delete(9);
        expect(client.del).toHaveBeenCalledWith(`${base}/9`);
    });
});
