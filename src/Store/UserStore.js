import {extendObservable, set} from 'mobx';

class UserStore {
    constructor() {
        console.log(sessionStorage.getItem("USERNAME"))
        extendObservable(this, {

            loading: true,
            username: sessionStorage.getItem("USERNAME"),
            token: ''

        })
        
    }
}

export default new UserStore();