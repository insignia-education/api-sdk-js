import InsigniaClient from '../../Client.js';
import Auth from './Auth.js';
import Accounts from './Accounts.js';
import Categories from './Categories.js';
import Changelogs from './Changelogs.js';
import Configs from './Configs.js';
import ContactForms from './ContactForms.js';
import ConversationalTopics from './ConversationalTopics.js';
import Countries from './Countries.js';
import Coupons from './Coupons.js';
import Courses from './Courses.js';
import Currencies from './Currencies.js';
import Files from './Files.js';
import Forums from './Forums.js';
import Hashes from './Hashes.js';
import Insignias from './Insignias.js';
import Languages from './Languages.js';
import MailBlacklist from './MailBlacklist.js';
import Organizations from './Organizations.js';
import Quizzes from './Quizzes.js';
import ShortLinks from './ShortLinks.js';
import Surveys from './Surveys.js';
import Tags from './Tags.js';
import Taxes from './Taxes.js';
import Teacher from './Teacher.js';
import Translations from './Translations.js';
import UserTypes from './UserTypes.js';
import Users from './Users.js';
import Zoom from './Zoom.js';

export default class InsigniaApiV1 {
    #client;

    constructor (baseUrl = null, token = null) {
        baseUrl = baseUrl && !baseUrl.endsWith('/v1') ? baseUrl.replace(/\/?$/, '/v1') : baseUrl;
        this.#client = new InsigniaClient(baseUrl, token);
        this.auth                 = new Auth(this.#client);
        this.accounts             = new Accounts(this.#client);
        this.categories           = new Categories(this.#client);
        this.changelogs           = new Changelogs(this.#client);
        this.configs              = new Configs(this.#client);
        this.contactForms         = new ContactForms(this.#client);
        this.conversationalTopics = new ConversationalTopics(this.#client);
        this.countries            = new Countries(this.#client);
        this.coupons              = new Coupons(this.#client);
        this.courses              = new Courses(this.#client);
        this.currencies           = new Currencies(this.#client);
        this.files                = new Files(this.#client);
        this.forums               = new Forums(this.#client);
        this.hashes               = new Hashes(this.#client);
        this.insignias            = new Insignias(this.#client);
        this.languages            = new Languages(this.#client);
        this.mailBlacklist        = new MailBlacklist(this.#client);
        this.organizations        = new Organizations(this.#client);
        this.quizzes              = new Quizzes(this.#client);
        this.shortLinks           = new ShortLinks(this.#client);
        this.surveys              = new Surveys(this.#client);
        this.tags                 = new Tags(this.#client);
        this.taxes                = new Taxes(this.#client);
        this.teacher              = new Teacher(this.#client);
        this.translations         = new Translations(this.#client);
        this.userTypes            = new UserTypes(this.#client);
        this.users                = new Users(this.#client);
        this.zoom                 = new Zoom(this.#client);
    }

    setToken(token) {
        this.#client.setToken(token);
    }

    getToken() {
        return this.#client.getToken();
    }
}
