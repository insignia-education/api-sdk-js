import CompanyCelebrations from '../../src/api/v1/CompanyCelebrations.js';

describe('CompanyCelebrations', () => {
    test('get(year) reads a year of celebratory media', async () => {
        const client = { get: jest.fn().mockResolvedValue([]) };

        await new CompanyCelebrations(client).get(2026);
        expect(client.get).toHaveBeenCalledWith('/company-celebrations', { year: 2026 });
    });

    test('edit(year, month, media) replaces a month', async () => {
        const client = { put: jest.fn().mockResolvedValue([]) };
        const media = [{ url: 'https://cdn.example.com/a.png', kind: 'image' }];

        await new CompanyCelebrations(client).edit(2026, 11, media);
        expect(client.put).toHaveBeenCalledWith('/company-celebrations', { year: 2026, month: 11, media });
    });

    test('current() reads what sellers should see now', async () => {
        const client = { get: jest.fn().mockResolvedValue({ active: false }) };

        await new CompanyCelebrations(client).current();
        expect(client.get).toHaveBeenCalledWith('/sales/celebration');
    });
});
