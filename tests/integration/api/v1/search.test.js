import {
    api,
    loginCustomer,
    loginAdmin
} from '../../../helpers.js';

describe('api/v1/search', () => {
    test('query | unauthenticated', async () => {
        await expect(api.search.query('a')).rejects.toMatchObject({ status: 401 });
    });
    test('query | authenticated but other type', async () => {
        await loginCustomer();
        await expect(api.search.query('a')).rejects.toMatchObject({ status: 403 });
    });
    test('query | authenticated', async () => {
        await loginAdmin();
        await api.search.query('a')
            .then(response => {
                expect(Array.isArray(response.users)).toBe(true);
                expect(Array.isArray(response.courses)).toBe(true);
                expect(typeof response.users_has_more).toBe('boolean');
            });
    });
    test('query | offset pages through the user results', async () => {
        await loginAdmin();
        await api.search.query('a', 0)
            .then(firstPage => {
                if (!firstPage.users_has_more) return;
                return api.search.query('a', firstPage.users.length)
                    .then(secondPage => {
                        expect(secondPage.users[0]?.id).not.toBe(firstPage.users[0]?.id);
                    });
            });
    });
});
