import moment from 'moment';

export class Storage {
    constructor() {
        this.index = {};
        this.storage = window.localStorage;
        this.session = window.sessionStorage;

        // reload index if needed
        this.loadIndex();
    }

    loadIndex() {
        let x = Object.keys(this.storage);

        for (var i = 0; i < x.length; i++) {
            this.index[x[i]] = true;
        }
    }

    store(key, value, expiration = (60*60*24*14), session = true) { // expiration default is 14 days multiplied by seconds
        let item = JSON.stringify({stamp: moment().add(expiration, 'seconds'), data: value});

        if(!session){
            this.index[key] = true;
            this.storage.setItem(key, item);
        }
        else{
            this.session.setItem(key, item);
        }
    }

    retrieve(key){
        let returnItem = JSON.parse(this[this.index[key] ? 'storage': 'session'].getItem(key));

        // if exists and not expired then return value
        if(returnItem && moment() <= moment(returnItem.stamp)){
            return returnItem.data;
        }

        // else, clear from storage and return null
        this.remove(key);

        return null;
    }

    remove(key){
        this[this.index[key] ? 'storage': 'session'].removeItem(key);
        delete this.index[key];
    }
}