import Store from 'node_modules/@insignia-education/js-core/Store.js'
export default class Cart{
    #__LOCAL_STORAGE_KEY__ = 'cart';
    #__CART_TYPES__ = [
        'sessions',
        'courses',
        'premiums',
        'products',
        'coupons',
        'exams',
    ];
    #getFromStore(){
        Store._store(this.#__LOCAL_STORAGE_KEY__);
    }
    #setInStore(cart){
        Store._store(this.#__LOCAL_STORAGE_KEY__, cart);
    }
    get(){
        let cart = this.#getFromStore();
        if(cart == null){
            cart = {};
        }
        this.#__CART_TYPES__.forEach(type => {
            if(typeof cart[type] === typeof undefined){
                cart[type] = [];
            }
        });
        this.#setInStore(cart);
        return this.#getFromStore();
    }
    getFromServer(){
        
    }
    static init(){
        console.log("cart init");
        const instance = new Cart();
        instance.get();
        console.log()
    }
}