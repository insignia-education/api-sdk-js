import Sales from '../../src/api/v1/Sales.js';

describe('Sales', () => {
    test('myClients() GETs /sales/my-clients with page params', async () => {
        const client = { get: jest.fn().mockResolvedValue({ data: [] }) };

        await expect(new Sales(client).myClients({ page: 2, perPage: 10 })).resolves.toEqual({ data: [] });
        expect(client.get).toHaveBeenCalledWith('/sales/my-clients', { page: 2, per_page: 10 });
    });

    test('myClients() works with no arguments', async () => {
        const client = { get: jest.fn().mockResolvedValue({ data: [] }) };

        await new Sales(client).myClients();
        expect(client.get).toHaveBeenCalledWith('/sales/my-clients', { page: undefined, per_page: undefined });
    });
});
