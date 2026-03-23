import InsigniaClient from './Client.js';

export default class Insignia extends InsigniaClient {

    constructor(baseUrl = null) {
        super(Insignia._resolve(baseUrl));
    }
}
