import { 
    api, 
    loginCustomer,
    loginAdmin,
    logout,
} from '../../../../helpers.js';




describe('api/v1/auth/login', () => {
    test('POST | failure | no email validation', async () => {
        const password = process.env.TEST_PASSWORD;
        logout()
        .then(() => api.auth.login({ password })
            .then(response => {
                // here we have more info of the request because we have the errors
                expect(response["success"]).toBeDefined();
                expect(response["status"]).toBeDefined();
                expect(response["status"]).toBe(422);
                expect(response["errors"]).toBeDefined();
                expect(Object.values(response["errors"]).length > 0).toBe(true);
                expect(response["errors"]["email"]).toBeDefined();
            }));
    });

    test('POST | failure | no password validation', async () => {
        const email = process.env.TEST_EMAIL;
        logout()
        .then(() => api.auth.login({ email })
            .then(response => {
                // here we have more info of the request because we have the errors
                expect(response["success"]).toBeDefined();
                expect(response["errors"]).toBeDefined();
                expect(response["status"]).toBeDefined();
                expect(response["status"]).toBe(422);
                expect(Object.values(response["errors"]).length > 0).toBe(true);
                expect(response["errors"]["password"]).toBeDefined();
            }));
        
    });

    test('POST | success', async () => {
        logout()
        .then(() => loginAdmin()
            .then(response => {
                expect(response["success"]).toBeDefined();
                expect(response["success"]).toBe("ok");
            }));
    });

    test('POST | double login', async () => {
        loginAdmin()
        .then(() => loginAdmin()
            .then(response => {
                expect(response["success"]).toBeDefined();
                expect(response["success"]).toBe("ok");
            }));
    });
});
