import { 
    api, 
    loginCustomer,
    loginAdmin
} from '../../../../helpers.js';

describe('api/v1/users', () => {
    // get(id = null) with no id returns the authenticated user's own
    // profile (UserController::get() -> auth()->user()), not a list.
    test('get | authenticated', async () => {
        await loginAdmin();
        await api.users.get()
            .then(response => {
                expect(response["id"]).toBeDefined();
                expect(response["name"]).toBeDefined();
                expect(response["email"]).toBeDefined();
                expect(response["created_at"]).toBeDefined();
                expect(response["updated_at"]).toBeDefined();
            });
    });

    test('get by id | authenticated', async () => {
        await loginAdmin();
        const me = await api.users.get();
        await api.users.get(me["id"])
            .then(response => {
                expect(response["id"]).toBe(me["id"]);
                expect(response["name"]).toBeDefined();
                expect(response["email"]).toBeDefined();
            });
    });
});
