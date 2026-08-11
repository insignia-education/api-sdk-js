import {
    api,
    loginAdmin,
    loginCustomer,
} from '../../../helpers.js';

describe('api/v1/telegram', () => {
    test('webhookStatus | requires authentication', async () => {
        await expect(api.telegram.webhookStatus()).rejects.toMatchObject({ status: 401 });
    });

    test('webhookStatus | forbidden below admin', async () => {
        await loginCustomer();
        await expect(api.telegram.webhookStatus()).rejects.toMatchObject({ status: 403 });
    });

    test('webhookStatus | reachable by admin', async () => {
        await loginAdmin();
        await api.telegram.webhookStatus()
            .then(response => {
                expect(typeof response).toBe('object');
            });
    });

    test('setWebhook | requires authentication', async () => {
        await expect(api.telegram.setWebhook()).rejects.toMatchObject({ status: 401 });
    });

    test('setWebhook | forbidden below admin', async () => {
        await loginCustomer();
        await expect(api.telegram.setWebhook()).rejects.toMatchObject({ status: 403 });
    });
});
