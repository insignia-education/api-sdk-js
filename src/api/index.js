import Insignia from '../index.js';

export default class InsigniaApi extends Insignia {
    constructor(baseUrl = null) {
        let url = InsigniaApi._resolve(baseUrl);
        if (!/\/api(\/|$)/.test(url)) url += '/api';
        super(url);
    }
}
