import InsigniaApi from '../index.js';
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
import PaymentMethods from './PaymentMethods.js';
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

export default class InsigniaApiV1 extends InsigniaApi {

    static _resolve(baseUrl) {
        baseUrl = InsigniaApi._resolve(baseUrl);
        baseUrl += !/\/v1(\/|$)/.test(baseUrl) ? '/v1' : '';
        return baseUrl;
    }
    constructor(baseUrl = null) {
        let url = InsigniaApiV1._resolve(baseUrl);
        super(url);

        this.auth                 = new Auth(this);
        this.accounts             = new Accounts(this);
        this.categories           = new Categories(this);
        this.changelogs           = new Changelogs(this);
        this.configs              = new Configs(this);
        this.contactForms         = new ContactForms(this);
        this.conversationalTopics = new ConversationalTopics(this);
        this.countries            = new Countries(this);
        this.coupons              = new Coupons(this);
        this.courses              = new Courses(this);
        this.currencies           = new Currencies(this);
        this.files                = new Files(this);
        this.forums               = new Forums(this);
        this.hashes               = new Hashes(this);
        this.insignias            = new Insignias(this);
        this.languages            = new Languages(this);
        this.mailBlacklist        = new MailBlacklist(this);
        this.organizations        = new Organizations(this);
        this.paymentMethods       = new PaymentMethods(this);
        this.quizzes              = new Quizzes(this);
        this.shortLinks           = new ShortLinks(this);
        this.surveys              = new Surveys(this);
        this.tags                 = new Tags(this);
        this.taxes                = new Taxes(this);
        this.teacher              = new Teacher(this);
        this.translations         = new Translations(this);
        this.userTypes            = new UserTypes(this);
        this.users                = new Users(this);
        this.zoom                 = new Zoom(this);
    }
}
