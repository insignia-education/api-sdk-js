import { 
    api, 
    loginCustomer,
    loginAdmin
} from '../../../helpers.js';


describe('api/v1/contact-forms', () => {
    test('get | authenticated', async () => {
        await loginAdmin();
        await api.contactForms.get()
            .then(response => {
                response = Object.values(response);
                expect(Array.isArray(response)).toBe(true);
                response.forEach(form => {
                    expect(form["id"]).toBeDefined();
                    expect(form["name"]).toBeDefined();
                    expect(form["email"]).toBeDefined();
                    expect(form["message"]).toBeDefined();
                    expect(form["created_at"]).toBeDefined();
                });
            });
    });
});
