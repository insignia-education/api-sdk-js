import { 
    api, 
    loginCustomer,
    loginAdmin
} from '../../../../helpers.js';

describe('api/v1/teacher/absences', () => {
    test('get | authenticated', async () => {
        await loginAdmin();
        await api.teacher.absences().get()
            .then(response => {
                response = Object.values(response);
                expect(Array.isArray(response)).toBe(true);
                response.forEach(absence => {
                    expect(absence["id"]).toBeDefined();
                    expect(absence["created_at"]).toBeDefined();
                    expect(absence["updated_at"]).toBeDefined();
                });
            });
    });
});

describe('api/v1/teacher/config-sets', () => {
    test('get | authenticated', async () => {
        await loginAdmin();
        await api.teacher.configSets().get()
            .then(response => {
                response = Object.values(response);
                expect(Array.isArray(response)).toBe(true);
                response.forEach(configSet => {
                    expect(configSet["id"]).toBeDefined();
                    expect(configSet["created_at"]).toBeDefined();
                    expect(configSet["updated_at"]).toBeDefined();
                });
            });
    });
});

describe('api/v1/teacher/configs', () => {
    test('get | authenticated', async () => {
        await login();
        await api.teacher.configs().get()
            .then(response => {
                response = Object.values(response);
                expect(Array.isArray(response)).toBe(true);
                response.forEach(config => {
                    expect(config["id"]).toBeDefined();
                    expect(config["created_at"]).toBeDefined();
                    expect(config["updated_at"]).toBeDefined();
                });
            });
    });
});
