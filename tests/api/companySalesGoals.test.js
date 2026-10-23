import CompanySalesGoals from '../../src/api/v1/CompanySalesGoals.js';

describe('CompanySalesGoals', () => {
    test('get(year) reads a year of company goals', async () => {
        const client = { get: jest.fn().mockResolvedValue([]) };

        await new CompanySalesGoals(client).get(2026);
        expect(client.get).toHaveBeenCalledWith('/company-sales-goals', { year: 2026 });
    });

    test('edit(year, goals) upserts months', async () => {
        const client = { put: jest.fn().mockResolvedValue([]) };

        await new CompanySalesGoals(client).edit(2026, [{ month: 1, amount: 500 }]);
        expect(client.put).toHaveBeenCalledWith('/company-sales-goals', { year: 2026, goals: [{ month: 1, amount: 500 }] });
    });
});
