import {
    api,
    loginAdmin
} from '../../../../helpers.js';

describe('api/v1/currencies/{id}/value', () => {

    test('setManualValue', async () => {
        await loginAdmin();
        await api.currencies.setManualValue(2, 123.45)
        .then(response => {
            expect(response["id"]).toBe(2);
            expect(response["is_manual"]).toBe(true);
        });
    });
});
