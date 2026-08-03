import { 
    api, 
    loginCustomer,
    loginAdmin
} from '../../../helpers.js';

describe('api/v1/configs', () => {
    test('get', async () => {
        await api.configs.get()
            .then(response => {
                response = Object.values(response);
                expect(response.length > 0).toBe(true);
                response.forEach(config => {
                    expect(config["id"]).toBeDefined();
                    expect(config["cod"]).toBeDefined();
                    expect(config["value"]).toBeDefined();
                });
            });
    });
});
