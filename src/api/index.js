import Insignia from '../index.js';

export default class InsigniaApi extends Insignia {
    constructor(baseUrl = null) {
        let url = InsigniaApi._resolve(baseUrl);
        super(url);
    }

    static _resolve(baseUrl) {
        baseUrl = Insignia._resolve(baseUrl);
        baseUrl += !/\/api(\/|$)/.test(baseUrl) ? '/api' : '';
        return baseUrl;
    }
}
