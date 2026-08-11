import {
    api,
    loginCustomer,
} from '../../../../helpers.js';

describe('api/v1/users/{id}/telegram', () => {
    test('linkToken | authenticated owner returns a deep link', async () => {
        await loginCustomer();
        const me = await api.users.get();
        await api.users.telegram(me["id"]).linkToken()
            .then(response => {
                expect(response["hash"]).toBeDefined();
                expect(response["link"]).toContain(response["hash"]);
                expect(response["link"]).toMatch(/^https:\/\/t\.me\//);
                expect(response["expires_at"]).toBeDefined();
            });
    });

    test('connect | rejects an invalid signature', async () => {
        await loginCustomer();
        const me = await api.users.get();
        await expect(api.users.telegram(me["id"]).connect({
            chat_id: '12345',
            username: 'someuser',
            expires_at: Math.floor(Date.now() / 1000) + 600,
            signature: 'not-a-real-signature',
        })).rejects.toMatchObject({ status: 422 });
    });

    test('connect | missing params returns a validation error', async () => {
        await loginCustomer();
        const me = await api.users.get();
        await expect(api.users.telegram(me["id"]).connect({}))
            .rejects.toMatchObject({ status: 422 });
    });
});
