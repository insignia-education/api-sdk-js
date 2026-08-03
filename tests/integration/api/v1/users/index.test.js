import { 
    api, 
    loginCustomer,
    loginAdmin
} from '../../../../helpers.js';

describe('api/v1/users', () => {
    test('get | authenticated', async () => {
        await loginAdmin();
        await api.users.get()
            .then(response => {
                response = Object.values(response);
                expect(response.length > 0).toBe(true);
                response.forEach(user => {
                    expect(user["id"]).toBeDefined();
                    expect(user["name"]).toBeDefined();
                    expect(user["email"]).toBeDefined();
                    expect(user["created_at"]).toBeDefined();
                    expect(user["updated_at"]).toBeDefined();
                });
            });
    });

    test('get by id | authenticated', async () => {
        await loginAdmin();
        const users = await api.users.get().then(r => Object.values(r));
        const id = users[0]["id"];
        await api.users.get(id)
            .then(response => {
                expect(response["id"]).toBe(id);
                expect(response["name"]).toBeDefined();
                expect(response["email"]).toBeDefined();
            });
    });
});
