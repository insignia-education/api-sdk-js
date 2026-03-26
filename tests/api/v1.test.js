import Auth from '../../src/api/v1/Auth.js';
import Accounts from '../../src/api/v1/Accounts.js';
import Categories from '../../src/api/v1/Categories.js';
import Changelogs from '../../src/api/v1/Changelogs.js';
import Configs from '../../src/api/v1/Configs.js';
import ContactForms from '../../src/api/v1/ContactForms.js';
import ConversationalTopics from '../../src/api/v1/ConversationalTopics.js';
import Countries from '../../src/api/v1/Countries.js';
import Coupons from '../../src/api/v1/Coupons.js';
import Courses from '../../src/api/v1/Courses.js';
import Currencies from '../../src/api/v1/Currencies.js';
import Files from '../../src/api/v1/Files.js';
import Forums from '../../src/api/v1/Forums.js';
import Hashes from '../../src/api/v1/Hashes.js';
import Insignias from '../../src/api/v1/Insignias.js';
import Languages from '../../src/api/v1/Languages.js';
import MailBlacklist from '../../src/api/v1/MailBlacklist.js';
import Organizations from '../../src/api/v1/Organizations.js';
import Quizzes from '../../src/api/v1/Quizzes.js';
import ShortLinks from '../../src/api/v1/ShortLinks.js';
import Surveys from '../../src/api/v1/Surveys.js';
import Tags from '../../src/api/v1/Tags.js';
import Taxes from '../../src/api/v1/Taxes.js';
import Teacher from '../../src/api/v1/Teacher.js';
import Translations from '../../src/api/v1/Translations.js';
import UserTypes from '../../src/api/v1/UserTypes.js';
import Users from '../../src/api/v1/Users.js';
import Zoom from '../../src/api/v1/Zoom.js';

function mockClient() {
    return {
        get:   jest.fn(),
        post:  jest.fn(),
        put:   jest.fn(),
        patch: jest.fn(),
        del:   jest.fn(),
    };
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

describe('Auth', () => {
    let c, r;
    beforeEach(() => { c = mockClient(); r = new Auth(c); });

    test('loginOrRegister', () => { r.loginOrRegister('a@b.com'); expect(c.get).toHaveBeenCalledWith('/auth/login-register-check?email=a%40b.com'); });
    test('register',        () => { r.register({});              expect(c.put).toHaveBeenCalledWith('/auth/register', {}); });
    test('login',           () => { r.login({});                 expect(c.post).toHaveBeenCalledWith('/auth/login', {}); });
    test('googleLogin',     () => { r.googleLogin({});           expect(c.post).toHaveBeenCalledWith('/auth/google', {}); });
    test('refresh',         () => { r.refresh();                 expect(c.post).toHaveBeenCalledWith('/auth/refresh'); });
    test('logout',          () => { r.logout();                  expect(c.post).toHaveBeenCalledWith('/auth/logout'); });
    test('user',            () => { r.user();                    expect(c.get).toHaveBeenCalledWith('/auth/user'); });
});

// ─── Accounts ────────────────────────────────────────────────────────────────

describe('Accounts', () => {
    let c, r;
    beforeEach(() => { c = mockClient(); r = new Accounts(c); });

    test('get all',     () => { r.get();        expect(c.get).toHaveBeenCalledWith('/accounts'); });
    test('get by id',   () => { r.get(5);       expect(c.get).toHaveBeenCalledWith('/accounts/5'); });
    test('create',      () => { r.create({});   expect(c.put).toHaveBeenCalledWith('/accounts', {}); });
    test('edit',        () => { r.edit(5, {});  expect(c.patch).toHaveBeenCalledWith('/accounts/5', {}); });
    test('delete',      () => { r.delete(5);    expect(c.del).toHaveBeenCalledWith('/accounts/5'); });

    describe('moves()', () => {
        test('get all',   () => { r.moves(3).get();       expect(c.get).toHaveBeenCalledWith('/accounts/3/moves'); });
        test('get by id', () => { r.moves(3).get(7);      expect(c.get).toHaveBeenCalledWith('/accounts/3/moves/7'); });
        test('create',    () => { r.moves(3).create({});  expect(c.put).toHaveBeenCalledWith('/accounts/3/moves', {}); });
        test('edit',      () => { r.moves(3).edit(7, {}); expect(c.patch).toHaveBeenCalledWith('/accounts/3/moves/7', {}); });
        test('delete',    () => { r.moves(3).delete(7);   expect(c.del).toHaveBeenCalledWith('/accounts/3/moves/7'); });
    });
});

// ─── Simple CRUD resources ────────────────────────────────────────────────────

const crudCases = [
    ['Categories',          Categories,          '/categories'],
    ['Configs',             Configs,             '/configs'],
    ['ConversationalTopics',ConversationalTopics,'/conversational-topics'],
    ['Coupons',             Coupons,             '/coupons'],
    ['Insignias',           Insignias,           '/insignias'],
    ['Languages',           Languages,           '/languages'],
    ['ShortLinks',          ShortLinks,          '/short-links'],
    ['Tags',                Tags,                '/tags'],
    ['Taxes',               Taxes,               '/taxes'],
    ['UserTypes',           UserTypes,           '/user-types'],
];

crudCases.forEach(([name, Class, base]) => {
    describe(name, () => {
        let c, r;
        beforeEach(() => { c = mockClient(); r = new Class(c); });

        test('get all',   () => { r.get();       expect(c.get).toHaveBeenCalledWith(base); });
        test('get by id', () => { r.get(1);      expect(c.get).toHaveBeenCalledWith(`${base}/1`); });
        test('create',    () => { r.create({});  expect(c.put).toHaveBeenCalledWith(base, {}); });
        test('edit',      () => { r.edit(1, {}); expect(c.patch).toHaveBeenCalledWith(`${base}/1`, {}); });
        test('delete',    () => { r.delete(1);   expect(c.del).toHaveBeenCalledWith(`${base}/1`); });
    });
});

// ─── Changelogs ───────────────────────────────────────────────────────────────

describe('Changelogs', () => {
    let c, r;
    beforeEach(() => { c = mockClient(); r = new Changelogs(c); });

    test('get all',  () => { r.get();           expect(c.get).toHaveBeenCalledWith('/changelogs'); });
    test('get by id',() => { r.get(1);          expect(c.get).toHaveBeenCalledWith('/changelogs/1'); });
    test('approve',  () => { r.approve(1);      expect(c.post).toHaveBeenCalledWith('/changelogs/1/approve'); });
    test('reject',   () => { r.reject(1, {});   expect(c.post).toHaveBeenCalledWith('/changelogs/1/reject', {}); });
});

// ─── ContactForms ─────────────────────────────────────────────────────────────

describe('ContactForms', () => {
    let c, r;
    beforeEach(() => { c = mockClient(); r = new ContactForms(c); });

    test('get all',  () => { r.get();            expect(c.get).toHaveBeenCalledWith('/contact-forms'); });
    test('get by id',() => { r.get(1);           expect(c.get).toHaveBeenCalledWith('/contact-forms/1'); });
    test('create',   () => { r.create({});       expect(c.put).toHaveBeenCalledWith('/contact-forms', {}); });
    test('answer',   () => { r.answer(1, {});    expect(c.post).toHaveBeenCalledWith('/contact-forms/1/answer', {}); });
    test('delete',   () => { r.delete(1);        expect(c.del).toHaveBeenCalledWith('/contact-forms/1'); });
});

// ─── Countries ────────────────────────────────────────────────────────────────

describe('Countries', () => {
    let c, r;
    beforeEach(() => { c = mockClient(); r = new Countries(c); });

    test('get all',   () => { r.get();  expect(c.get).toHaveBeenCalledWith('/countries'); });
    test('get by id', () => { r.get(1); expect(c.get).toHaveBeenCalledWith('/countries/1'); });
});

// ─── Currencies ───────────────────────────────────────────────────────────────

describe('Currencies', () => {
    let c, r;
    beforeEach(() => { c = mockClient(); r = new Currencies(c); });

    test('get all',   () => { r.get();      expect(c.get).toHaveBeenCalledWith('/currencies'); });
    test('get by id', () => { r.get(1);     expect(c.get).toHaveBeenCalledWith('/currencies/1'); });
    test('getValues', () => { r.getValues();expect(c.get).toHaveBeenCalledWith('/currencies/values'); });
});

// ─── Files ────────────────────────────────────────────────────────────────────

describe('Files', () => {
    let c, r;
    beforeEach(() => { c = mockClient(); r = new Files(c); });

    test('get all',   () => { r.get();    expect(c.get).toHaveBeenCalledWith('/files'); });
    test('get by id', () => { r.get(1);   expect(c.get).toHaveBeenCalledWith('/files/1'); });
    test('delete',    () => { r.delete(1);expect(c.del).toHaveBeenCalledWith('/files/1'); });
});

// ─── Forums ───────────────────────────────────────────────────────────────────

describe('Forums', () => {
    let c, r;
    beforeEach(() => { c = mockClient(); r = new Forums(c); });

    test('get all',  () => { r.get();       expect(c.get).toHaveBeenCalledWith('/forums'); });
    test('get by id',() => { r.get(1);      expect(c.get).toHaveBeenCalledWith('/forums/1'); });
    test('create',   () => { r.create({});  expect(c.put).toHaveBeenCalledWith('/forums', {}); });
    test('edit',     () => { r.edit(1, {}); expect(c.patch).toHaveBeenCalledWith('/forums/1', {}); });
    test('delete',   () => { r.delete(1);   expect(c.del).toHaveBeenCalledWith('/forums/1'); });
    test('approve',  () => { r.approve(1);  expect(c.post).toHaveBeenCalledWith('/forums/1/approve'); });

    describe('responses()', () => {
        test('get all',   () => { r.responses(2).get();          expect(c.get).toHaveBeenCalledWith('/forums/2/responses'); });
        test('get by id', () => { r.responses(2).get(5);         expect(c.get).toHaveBeenCalledWith('/forums/2/responses/5'); });
        test('create',    () => { r.responses(2).create({});     expect(c.put).toHaveBeenCalledWith('/forums/2/responses', {}); });
        test('edit',      () => { r.responses(2).edit(5, {});    expect(c.patch).toHaveBeenCalledWith('/forums/2/responses/5', {}); });
        test('delete',    () => { r.responses(2).delete(5);      expect(c.del).toHaveBeenCalledWith('/forums/2/responses/5'); });
        test('approve',   () => { r.responses(2).approve(5);     expect(c.post).toHaveBeenCalledWith('/forums/2/responses/5/approve'); });
    });
});

// ─── Hashes ───────────────────────────────────────────────────────────────────

describe('Hashes', () => {
    let c, r;
    beforeEach(() => { c = mockClient(); r = new Hashes(c); });

    test('get all',   () => { r.get();          expect(c.get).toHaveBeenCalledWith('/hashes'); });
    test('get by id', () => { r.get(1);         expect(c.get).toHaveBeenCalledWith('/hashes/1'); });
    test('generate',  () => { r.generate({});   expect(c.put).toHaveBeenCalledWith('/hashes/generate', {}); });
    test('delete',    () => { r.delete(1);      expect(c.del).toHaveBeenCalledWith('/hashes/1'); });
});

// ─── MailBlacklist ────────────────────────────────────────────────────────────

describe('MailBlacklist', () => {
    let c, r;
    beforeEach(() => { c = mockClient(); r = new MailBlacklist(c); });

    test('get all',   () => { r.get();        expect(c.get).toHaveBeenCalledWith('/mail-blacklist'); });
    test('get by id', () => { r.get(1);       expect(c.get).toHaveBeenCalledWith('/mail-blacklist/1'); });
    test('create',    () => { r.create({});   expect(c.put).toHaveBeenCalledWith('/mail-blacklist', {}); });
    test('delete',    () => { r.delete(1);    expect(c.del).toHaveBeenCalledWith('/mail-blacklist/1'); });
});

// ─── Organizations ────────────────────────────────────────────────────────────

describe('Organizations', () => {
    let c, r;
    beforeEach(() => { c = mockClient(); r = new Organizations(c); });

    test('get all',   () => { r.get();       expect(c.get).toHaveBeenCalledWith('/organizations'); });
    test('get by id', () => { r.get(1);      expect(c.get).toHaveBeenCalledWith('/organizations/1'); });
    test('create',    () => { r.create({});  expect(c.put).toHaveBeenCalledWith('/organizations', {}); });
    test('edit',      () => { r.edit(1, {}); expect(c.patch).toHaveBeenCalledWith('/organizations/1', {}); });
});

// ─── Translations ─────────────────────────────────────────────────────────────

describe('Translations', () => {
    let c, r;
    beforeEach(() => { c = mockClient(); r = new Translations(c); });

    test('get all',   () => { r.get();             expect(c.get).toHaveBeenCalledWith('/translations'); });
    test('get by id', () => { r.get(1);            expect(c.get).toHaveBeenCalledWith('/translations/1'); });
    test('create',    () => { r.create({});        expect(c.put).toHaveBeenCalledWith('/translations', {}); });
    test('delete',    () => { r.delete(1);         expect(c.del).toHaveBeenCalledWith('/translations/1'); });
    test('editText',  () => { r.editText(1, {});   expect(c.patch).toHaveBeenCalledWith('/translations/1/text', {}); });
});

// ─── Courses (nested) ─────────────────────────────────────────────────────────

describe('Courses', () => {
    let c, r;
    beforeEach(() => { c = mockClient(); r = new Courses(c); });

    test('get all',              () => { r.get();                                 expect(c.get).toHaveBeenCalledWith('/courses'); });
    test('get all with page',    () => { r.get(null, { page: 2 });               expect(c.get).toHaveBeenCalledWith('/courses?page=2'); });
    test('get all with perPage', () => { r.get(null, { perPage: 25 });           expect(c.get).toHaveBeenCalledWith('/courses?per_page=25'); });
    test('get all with both',    () => { r.get(null, { page: 2, perPage: 25 }); expect(c.get).toHaveBeenCalledWith('/courses?page=2&per_page=25'); });
    test('get by id',            () => { r.get(1);                               expect(c.get).toHaveBeenCalledWith('/courses/1'); });
    test('create',    () => { r.create({});  expect(c.put).toHaveBeenCalledWith('/courses', {}); });
    test('edit',      () => { r.edit(1, {}); expect(c.patch).toHaveBeenCalledWith('/courses/1', {}); });
    test('delete',    () => { r.delete(1);   expect(c.del).toHaveBeenCalledWith('/courses/1'); });

    describe('dates()', () => {
        test('get all',   () => { r.dates(1).get();       expect(c.get).toHaveBeenCalledWith('/courses/1/dates'); });
        test('get by id', () => { r.dates(1).get(2);      expect(c.get).toHaveBeenCalledWith('/courses/1/dates/2'); });
        test('create',    () => { r.dates(1).create({});  expect(c.put).toHaveBeenCalledWith('/courses/1/dates', {}); });
        test('edit',      () => { r.dates(1).edit(2, {}); expect(c.patch).toHaveBeenCalledWith('/courses/1/dates/2', {}); });
        test('delete',    () => { r.dates(1).delete(2);   expect(c.del).toHaveBeenCalledWith('/courses/1/dates/2'); });
    });

    describe('sessions()', () => {
        test('get all',   () => { r.sessions(1).get();       expect(c.get).toHaveBeenCalledWith('/courses/1/sessions'); });
        test('get by id', () => { r.sessions(1).get(2);      expect(c.get).toHaveBeenCalledWith('/courses/1/sessions/2'); });
        test('create',    () => { r.sessions(1).create({});  expect(c.put).toHaveBeenCalledWith('/courses/1/sessions', {}); });
        test('edit',      () => { r.sessions(1).edit(2, {}); expect(c.patch).toHaveBeenCalledWith('/courses/1/sessions/2', {}); });
        test('delete',    () => { r.sessions(1).delete(2);   expect(c.del).toHaveBeenCalledWith('/courses/1/sessions/2'); });
    });

    describe('premiums()', () => {
        test('get all',   () => { r.premiums(1).get();       expect(c.get).toHaveBeenCalledWith('/courses/1/premiums'); });
        test('get by id', () => { r.premiums(1).get(2);      expect(c.get).toHaveBeenCalledWith('/courses/1/premiums/2'); });
        test('create',    () => { r.premiums(1).create({});  expect(c.put).toHaveBeenCalledWith('/courses/1/premiums', {}); });
        test('edit',      () => { r.premiums(1).edit(2, {}); expect(c.patch).toHaveBeenCalledWith('/courses/1/premiums/2', {}); });
        test('delete',    () => { r.premiums(1).delete(2);   expect(c.del).toHaveBeenCalledWith('/courses/1/premiums/2'); });

        describe('items()', () => {
            test('get all',   () => { r.premiums(1).items(2).get();       expect(c.get).toHaveBeenCalledWith('/courses/1/premiums/2/items'); });
            test('get by id', () => { r.premiums(1).items(2).get(3);      expect(c.get).toHaveBeenCalledWith('/courses/1/premiums/2/items/3'); });
            test('create',    () => { r.premiums(1).items(2).create({});  expect(c.put).toHaveBeenCalledWith('/courses/1/premiums/2/items', {}); });
            test('edit',      () => { r.premiums(1).items(2).edit(3, {}); expect(c.patch).toHaveBeenCalledWith('/courses/1/premiums/2/items/3', {}); });
            test('delete',    () => { r.premiums(1).items(2).delete(3);   expect(c.del).toHaveBeenCalledWith('/courses/1/premiums/2/items/3'); });
        });
    });

    describe('levels()', () => {
        test('get all',   () => { r.levels(1).get();       expect(c.get).toHaveBeenCalledWith('/courses/1/levels'); });
        test('get by id', () => { r.levels(1).get(2);      expect(c.get).toHaveBeenCalledWith('/courses/1/levels/2'); });
        test('create',    () => { r.levels(1).create({});  expect(c.put).toHaveBeenCalledWith('/courses/1/levels', {}); });
        test('edit',      () => { r.levels(1).edit(2, {}); expect(c.patch).toHaveBeenCalledWith('/courses/1/levels/2', {}); });
        test('delete',    () => { r.levels(1).delete(2);   expect(c.del).toHaveBeenCalledWith('/courses/1/levels/2'); });

        describe('lessons()', () => {
            test('get all',   () => { r.levels(1).lessons(2).get();       expect(c.get).toHaveBeenCalledWith('/courses/1/levels/2/lessons'); });
            test('get by id', () => { r.levels(1).lessons(2).get(3);      expect(c.get).toHaveBeenCalledWith('/courses/1/levels/2/lessons/3'); });
            test('create',    () => { r.levels(1).lessons(2).create({});  expect(c.put).toHaveBeenCalledWith('/courses/1/levels/2/lessons', {}); });
            test('edit',      () => { r.levels(1).lessons(2).edit(3, {}); expect(c.patch).toHaveBeenCalledWith('/courses/1/levels/2/lessons/3', {}); });
            test('delete',    () => { r.levels(1).lessons(2).delete(3);   expect(c.del).toHaveBeenCalledWith('/courses/1/levels/2/lessons/3'); });

            describe('materials()', () => {
                test('get all',   () => { r.levels(1).lessons(2).materials(3).get();       expect(c.get).toHaveBeenCalledWith('/courses/1/levels/2/lessons/3/materials'); });
                test('get by id', () => { r.levels(1).lessons(2).materials(3).get(4);      expect(c.get).toHaveBeenCalledWith('/courses/1/levels/2/lessons/3/materials/4'); });
                test('create',    () => { r.levels(1).lessons(2).materials(3).create({});  expect(c.put).toHaveBeenCalledWith('/courses/1/levels/2/lessons/3/materials', {}); });
                test('edit',      () => { r.levels(1).lessons(2).materials(3).edit(4, {}); expect(c.patch).toHaveBeenCalledWith('/courses/1/levels/2/lessons/3/materials/4', {}); });
                test('delete',    () => { r.levels(1).lessons(2).materials(3).delete(4);   expect(c.del).toHaveBeenCalledWith('/courses/1/levels/2/lessons/3/materials/4'); });
            });
        });
    });
});

// ─── Quizzes (nested) ─────────────────────────────────────────────────────────

describe('Quizzes', () => {
    let c, r;
    beforeEach(() => { c = mockClient(); r = new Quizzes(c); });

    test('get all',   () => { r.get();       expect(c.get).toHaveBeenCalledWith('/quizzes'); });
    test('get by id', () => { r.get(1);      expect(c.get).toHaveBeenCalledWith('/quizzes/1'); });
    test('create',    () => { r.create({});  expect(c.put).toHaveBeenCalledWith('/quizzes', {}); });
    test('edit',      () => { r.edit(1, {}); expect(c.patch).toHaveBeenCalledWith('/quizzes/1', {}); });
    test('delete',    () => { r.delete(1);   expect(c.del).toHaveBeenCalledWith('/quizzes/1'); });

    describe('questions()', () => {
        test('get all',   () => { r.questions(1).get();       expect(c.get).toHaveBeenCalledWith('/quizzes/1/questions'); });
        test('get by id', () => { r.questions(1).get(2);      expect(c.get).toHaveBeenCalledWith('/quizzes/1/questions/2'); });
        test('create',    () => { r.questions(1).create({});  expect(c.put).toHaveBeenCalledWith('/quizzes/1/questions', {}); });
        test('edit',      () => { r.questions(1).edit(2, {}); expect(c.patch).toHaveBeenCalledWith('/quizzes/1/questions/2', {}); });
        test('delete',    () => { r.questions(1).delete(2);   expect(c.del).toHaveBeenCalledWith('/quizzes/1/questions/2'); });

        describe('answers()', () => {
            test('get all',   () => { r.questions(1).answers(2).get();       expect(c.get).toHaveBeenCalledWith('/quizzes/1/questions/2/answers'); });
            test('get by id', () => { r.questions(1).answers(2).get(3);      expect(c.get).toHaveBeenCalledWith('/quizzes/1/questions/2/answers/3'); });
            test('create',    () => { r.questions(1).answers(2).create({});  expect(c.put).toHaveBeenCalledWith('/quizzes/1/questions/2/answers', {}); });
            test('edit',      () => { r.questions(1).answers(2).edit(3, {}); expect(c.patch).toHaveBeenCalledWith('/quizzes/1/questions/2/answers/3', {}); });
            test('delete',    () => { r.questions(1).answers(2).delete(3);   expect(c.del).toHaveBeenCalledWith('/quizzes/1/questions/2/answers/3'); });
        });
    });
});

// ─── Surveys (nested) ─────────────────────────────────────────────────────────

describe('Surveys', () => {
    let c, r;
    beforeEach(() => { c = mockClient(); r = new Surveys(c); });

    test('get all',   () => { r.get();       expect(c.get).toHaveBeenCalledWith('/surveys'); });
    test('get by id', () => { r.get(1);      expect(c.get).toHaveBeenCalledWith('/surveys/1'); });
    test('create',    () => { r.create({});  expect(c.put).toHaveBeenCalledWith('/surveys', {}); });
    test('edit',      () => { r.edit(1, {}); expect(c.patch).toHaveBeenCalledWith('/surveys/1', {}); });
    test('delete',    () => { r.delete(1);   expect(c.del).toHaveBeenCalledWith('/surveys/1'); });

    describe('questions()', () => {
        test('get all',   () => { r.questions(1).get();       expect(c.get).toHaveBeenCalledWith('/surveys/1/questions'); });
        test('get by id', () => { r.questions(1).get(2);      expect(c.get).toHaveBeenCalledWith('/surveys/1/questions/2'); });
        test('create',    () => { r.questions(1).create({});  expect(c.put).toHaveBeenCalledWith('/surveys/1/questions', {}); });
        test('edit',      () => { r.questions(1).edit(2, {}); expect(c.patch).toHaveBeenCalledWith('/surveys/1/questions/2', {}); });
        test('delete',    () => { r.questions(1).delete(2);   expect(c.del).toHaveBeenCalledWith('/surveys/1/questions/2'); });

        describe('answers()', () => {
            test('get all',   () => { r.questions(1).answers(2).get();       expect(c.get).toHaveBeenCalledWith('/surveys/1/questions/2/answers'); });
            test('get by id', () => { r.questions(1).answers(2).get(3);      expect(c.get).toHaveBeenCalledWith('/surveys/1/questions/2/answers/3'); });
            test('create',    () => { r.questions(1).answers(2).create({});  expect(c.put).toHaveBeenCalledWith('/surveys/1/questions/2/answers', {}); });
            test('edit',      () => { r.questions(1).answers(2).edit(3, {}); expect(c.patch).toHaveBeenCalledWith('/surveys/1/questions/2/answers/3', {}); });
            test('delete',    () => { r.questions(1).answers(2).delete(3);   expect(c.del).toHaveBeenCalledWith('/surveys/1/questions/2/answers/3'); });
        });
    });
});

// ─── Teacher ─────────────────────────────────────────────────────────────────

describe('Teacher', () => {
    let c, r;
    beforeEach(() => { c = mockClient(); r = new Teacher(c); });

    describe('absences()', () => {
        test('get all',   () => { r.absences().get();       expect(c.get).toHaveBeenCalledWith('/teacher/absences'); });
        test('get by id', () => { r.absences().get(1);      expect(c.get).toHaveBeenCalledWith('/teacher/absences/1'); });
        test('create',    () => { r.absences().create({});  expect(c.put).toHaveBeenCalledWith('/teacher/absences', {}); });
        test('edit',      () => { r.absences().edit(1, {}); expect(c.patch).toHaveBeenCalledWith('/teacher/absences/1', {}); });
        test('delete',    () => { r.absences().delete(1);   expect(c.del).toHaveBeenCalledWith('/teacher/absences/1'); });
    });

    describe('configSets()', () => {
        test('get all',   () => { r.configSets().get();       expect(c.get).toHaveBeenCalledWith('/teacher/config-sets'); });
        test('get by id', () => { r.configSets().get(1);      expect(c.get).toHaveBeenCalledWith('/teacher/config-sets/1'); });
        test('create',    () => { r.configSets().create({});  expect(c.put).toHaveBeenCalledWith('/teacher/config-sets', {}); });
        test('edit',      () => { r.configSets().edit(1, {}); expect(c.patch).toHaveBeenCalledWith('/teacher/config-sets/1', {}); });
        test('delete',    () => { r.configSets().delete(1);   expect(c.del).toHaveBeenCalledWith('/teacher/config-sets/1'); });
    });

    describe('configs()', () => {
        test('get all',   () => { r.configs().get();       expect(c.get).toHaveBeenCalledWith('/teacher/configs'); });
        test('get by id', () => { r.configs().get(1);      expect(c.get).toHaveBeenCalledWith('/teacher/configs/1'); });
        test('create',    () => { r.configs().create({});  expect(c.put).toHaveBeenCalledWith('/teacher/configs', {}); });
        test('edit',      () => { r.configs().edit(1, {}); expect(c.patch).toHaveBeenCalledWith('/teacher/configs/1', {}); });
        test('delete',    () => { r.configs().delete(1);   expect(c.del).toHaveBeenCalledWith('/teacher/configs/1'); });
    });
});

// ─── Users (nested) ───────────────────────────────────────────────────────────

describe('Users', () => {
    let c, r;
    beforeEach(() => { c = mockClient(); r = new Users(c); });

    test('get all',   () => { r.get();       expect(c.get).toHaveBeenCalledWith('/users'); });
    test('get by id', () => { r.get(1);      expect(c.get).toHaveBeenCalledWith('/users/1'); });
    test('edit',      () => { r.edit(1, {}); expect(c.patch).toHaveBeenCalledWith('/users/1', {}); });

    const nestedPaths = [
        ['courses',    'courses'],
        ['courseNotes','course-notes'],
        ['quizzes',    'quizzes'],
        ['sessions',   'sessions'],
        ['surveys',    'surveys'],
        ['cart',       'cart'],
    ];

    nestedPaths.forEach(([method, path]) => {
        describe(`${method}()`, () => {
            test('get all',   () => { r[method](1).get();       expect(c.get).toHaveBeenCalledWith(`/users/1/${path}`); });
            test('get by id', () => { r[method](1).get(2);      expect(c.get).toHaveBeenCalledWith(`/users/1/${path}/2`); });
            test('create',    () => { r[method](1).create({});  expect(c.put).toHaveBeenCalledWith(`/users/1/${path}`, {}); });
            test('edit',      () => { r[method](1).edit(2, {}); expect(c.patch).toHaveBeenCalledWith(`/users/1/${path}/2`, {}); });
            test('delete',    () => { r[method](1).delete(2);   expect(c.del).toHaveBeenCalledWith(`/users/1/${path}/2`); });
        });
    });

    describe('payments()', () => {
        test('get all',   () => { r.payments(1).get();          expect(c.get).toHaveBeenCalledWith('/users/1/payments'); });
        test('get by id', () => { r.payments(1).get(2);         expect(c.get).toHaveBeenCalledWith('/users/1/payments/2'); });
        test('create',    () => { r.payments(1).create({});     expect(c.put).toHaveBeenCalledWith('/users/1/payments', {}); });
        test('edit',      () => { r.payments(1).edit(2, {});    expect(c.patch).toHaveBeenCalledWith('/users/1/payments/2', {}); });
        test('delete',    () => { r.payments(1).delete(2);      expect(c.del).toHaveBeenCalledWith('/users/1/payments/2'); });
        test('verify',    () => { r.payments(1).verify(2);      expect(c.post).toHaveBeenCalledWith('/users/1/payments/2/verify'); });
        test('reject',    () => { r.payments(1).reject(2, {});  expect(c.post).toHaveBeenCalledWith('/users/1/payments/2/reject', {}); });
    });

    describe('points()', () => {
        test('get all',   () => { r.points(1).get();      expect(c.get).toHaveBeenCalledWith('/users/1/points'); });
        test('get by id', () => { r.points(1).get(2);     expect(c.get).toHaveBeenCalledWith('/users/1/points/2'); });
        test('create',    () => { r.points(1).create({}); expect(c.put).toHaveBeenCalledWith('/users/1/points', {}); });
        test('delete',    () => { r.points(1).delete(2);  expect(c.del).toHaveBeenCalledWith('/users/1/points/2'); });
    });

    describe('moneyMoves()', () => {
        test('get all',   () => { r.moneyMoves(1).get();      expect(c.get).toHaveBeenCalledWith('/users/1/money-moves'); });
        test('get by id', () => { r.moneyMoves(1).get(2);     expect(c.get).toHaveBeenCalledWith('/users/1/money-moves/2'); });
        test('create',    () => { r.moneyMoves(1).create({}); expect(c.put).toHaveBeenCalledWith('/users/1/money-moves', {}); });
    });

    describe('statistics()', () => {
        test('get', () => { r.statistics(1).get(); expect(c.get).toHaveBeenCalledWith('/users/1/statistics'); });
    });

    describe('organizations()', () => {
        test('get all',   () => { r.organizations(1).get();      expect(c.get).toHaveBeenCalledWith('/users/1/organizations'); });
        test('get by id', () => { r.organizations(1).get(2);     expect(c.get).toHaveBeenCalledWith('/users/1/organizations/2'); });
        test('create',    () => { r.organizations(1).create({}); expect(c.put).toHaveBeenCalledWith('/users/1/organizations', {}); });
        test('delete',    () => { r.organizations(1).delete(2);  expect(c.del).toHaveBeenCalledWith('/users/1/organizations/2'); });
    });

    describe('pushEndpoints()', () => {
        test('get all',   () => { r.pushEndpoints(1).get();      expect(c.get).toHaveBeenCalledWith('/users/1/push-endpoints'); });
        test('get by id', () => { r.pushEndpoints(1).get(2);     expect(c.get).toHaveBeenCalledWith('/users/1/push-endpoints/2'); });
        test('create',    () => { r.pushEndpoints(1).create({}); expect(c.put).toHaveBeenCalledWith('/users/1/push-endpoints', {}); });
        test('delete',    () => { r.pushEndpoints(1).delete(2);  expect(c.del).toHaveBeenCalledWith('/users/1/push-endpoints/2'); });
    });
});

// ─── Zoom ─────────────────────────────────────────────────────────────────────

describe('Zoom', () => {
    let c, r;
    beforeEach(() => { c = mockClient(); r = new Zoom(c); });

    describe('meetings()', () => {
        test('get all',   () => { r.meetings().get();   expect(c.get).toHaveBeenCalledWith('/zoom/meetings'); });
        test('get by id', () => { r.meetings().get(1);  expect(c.get).toHaveBeenCalledWith('/zoom/meetings/1'); });
    });

    describe('tokens()', () => {
        test('get all',   () => { r.tokens().get();       expect(c.get).toHaveBeenCalledWith('/zoom/tokens'); });
        test('get by id', () => { r.tokens().get(1);      expect(c.get).toHaveBeenCalledWith('/zoom/tokens/1'); });
        test('create',    () => { r.tokens().create({});  expect(c.put).toHaveBeenCalledWith('/zoom/tokens', {}); });
        test('edit',      () => { r.tokens().edit(1, {}); expect(c.patch).toHaveBeenCalledWith('/zoom/tokens/1', {}); });
        test('delete',    () => { r.tokens().delete(1);   expect(c.del).toHaveBeenCalledWith('/zoom/tokens/1'); });
    });
});
