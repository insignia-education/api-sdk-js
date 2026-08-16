import InsigniaApi from '../index.js';
import Admin from './Admin.js';
import Auth from './Auth.js';
import Accounts from './Accounts.js';
import Certificates from './Certificates.js';
import Changelogs from './Changelogs.js';
import CompanySettings from './CompanySettings.js';
import ContactForms from './ContactForms.js';
import ConversationalTopics from './ConversationalTopics.js';
import Countries from './Countries.js';
import Coupons from './Coupons.js';
import Courses from './Courses.js';
import Currencies from './Currencies.js';
import Dashboard from './Dashboard.js';
import EducationCenter from './EducationCenter.js';
import Employee from './Employee.js';
import Files from './Files.js';
import Forums from './Forums.js';
import Hashes from './Hashes.js';
import Insignias from './Insignias.js';
import Languages from './Languages.js';
import MailBlacklist from './MailBlacklist.js';
import MailingLists from './MailingLists.js';
import Offers from './Offers.js';
import Organizations from './Organizations.js';
import PaymentMethods from './PaymentMethods.js';
import Payments from './Payments.js';
import Quizzes from './Quizzes.js';
import Sales from './Sales.js';
import Search from './Search.js';
import ShortLinks from './ShortLinks.js';
import Surveys from './Surveys.js';
import Premiums from './Premiums.js';
import Taxes from './Taxes.js';
import Teacher from './Teacher.js';
import Telegram from './Telegram.js';
import TwoFactor from './TwoFactor.js';
import UserSessionTypes from './UserSessionTypes.js';
import UserTypes from './UserTypes.js';
import Users from './Users.js';
import Utm from './Utm.js';
import Webauthn from './Webauthn.js';
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

        this.admin                = new Admin(this);
        this.auth                 = new Auth(this);
        this.accounts             = new Accounts(this);
        this.certificates         = new Certificates(this);
        this.changelogs           = new Changelogs(this);
        this.companySettings      = new CompanySettings(this);
        this.contactForms         = new ContactForms(this);
        this.conversationalTopics = new ConversationalTopics(this);
        this.countries            = new Countries(this);
        this.coupons              = new Coupons(this);
        this.courses              = new Courses(this);
        this.currencies           = new Currencies(this);
        this.dashboard            = new Dashboard(this);
        this.educationCenter      = new EducationCenter(this);
        this.employee             = new Employee(this);
        this.files                = new Files(this);
        this.forums               = new Forums(this);
        this.hashes               = new Hashes(this);
        this.insignias            = new Insignias(this);
        this.languages            = new Languages(this);
        this.mailBlacklist        = new MailBlacklist(this);
        this.mailingLists         = new MailingLists(this);
        this.offers               = new Offers(this);
        this.organizations        = new Organizations(this);
        this.paymentMethods       = new PaymentMethods(this);
        this.payments             = new Payments(this);
        this.quizzes              = new Quizzes(this);
        this.sales                = new Sales(this);
        this.search               = new Search(this);
        this.shortLinks           = new ShortLinks(this);
        this.surveys              = new Surveys(this);
        this.premiums             = new Premiums(this);
        this.taxes                = new Taxes(this);
        this.teacher              = new Teacher(this);
        this.telegram             = new Telegram(this);
        this.twoFactor            = new TwoFactor(this);
        this.userSessionTypes     = new UserSessionTypes(this);
        this.userTypes            = new UserTypes(this);
        this.users                = new Users(this);
        this.utm                  = new Utm(this);
        this.webauthn             = new Webauthn(this);
        this.zoom                 = new Zoom(this);
    }
}
