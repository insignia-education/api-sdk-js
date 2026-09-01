import { 
    api, 
    loginCustomer,
    loginAdmin
} from '../../../../helpers.js';

describe('api/v1/courses', () => {
    test('get | returns paginated list', async () => {
        await api.courses.get()
            .then(response => {
                console.log(response);
                expect(response["data"]).toBeDefined();
                expect(response["current_page"]).toBeDefined();
                expect(response["last_page"]).toBeDefined();
                expect(response["per_page"]).toBeDefined();
                expect(response["total"]).toBeDefined();
                expect(Array.isArray(response["data"])).toBe(true);
                expect(response["data"].length > 0).toBe(true);
                response["data"].forEach(course => {
                    expect(course["id"]).toBeDefined();
                    expect(course["cod"]).toBeDefined();
                    expect(course["title"]).toBeDefined();
                    expect(course["enabled"]).toBeDefined();
                });
            });
    });

    test('get | page 2', async () => {
        await api.courses.get(null, { page: 2 })
            .then(response => {
                expect(response["data"]).toBeDefined();
                expect(response["current_page"]).toBe(2);
            });
    });

    test('get by id | returns single course', async () => {
        const firstPage = await api.courses.get();
        const id = firstPage["data"][0]["id"];
        await api.courses.get(id)
            .then(response => {
                expect(response["id"]).toBe(id);
                expect(response["cod"]).toBeDefined();
                expect(response["title"]).toBeDefined();
            });
    });

    test('getAll | enabledOnly excludes disabled courses even for a logged-in employee', async () => {
        await loginAdmin();
        const all = await api.courses.getAll();
        const enabledOnly = await api.courses.getAll({ enabledOnly: true });

        expect(all.some(c => !c.enabled)).toBe(true);
        expect(enabledOnly.every(c => c.enabled)).toBe(true);
    });
});
