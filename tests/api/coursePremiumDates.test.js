import Courses from '../../src/api/v1/Courses.js';

describe('Courses premium <-> date assignment', () => {
    test('dates(courseId).premiums(dateId).get() reads the date\'s premiums', async () => {
        const client = { get: jest.fn().mockResolvedValue([{ id: 3 }]) };
        await expect(new Courses(client).dates(7).premiums(11).get()).resolves.toEqual([{ id: 3 }]);
        expect(client.get).toHaveBeenCalledWith('/courses/7/dates/11/premiums');
    });

    test('dates(courseId).premiums(dateId).set() puts premium_ids', async () => {
        const client = { put: jest.fn().mockResolvedValue({ premium_ids: [3, 4] }) };
        await new Courses(client).dates(7).premiums(11).set([3, 4]);
        expect(client.put).toHaveBeenCalledWith('/courses/7/dates/11/premiums', { premium_ids: [3, 4] });
    });

    test('premiums(courseId).dates(premiumId).get() reads the premium\'s dates', async () => {
        const client = { get: jest.fn().mockResolvedValue([{ id: 11 }]) };
        await expect(new Courses(client).premiums(7).dates(3).get()).resolves.toEqual([{ id: 11 }]);
        expect(client.get).toHaveBeenCalledWith('/courses/7/premiums/3/dates');
    });

    test('premiums(courseId).dates(premiumId).set() puts date_ids, [] clears', async () => {
        const client = { put: jest.fn().mockResolvedValue({ date_ids: [] }) };
        await new Courses(client).premiums(7).dates(3).set([]);
        expect(client.put).toHaveBeenCalledWith('/courses/7/premiums/3/dates', { date_ids: [] });
    });
});
