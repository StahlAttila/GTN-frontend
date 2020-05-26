import {extendObservable, set} from 'mobx';

class UserStore {
    constructor() {
        extendObservable(this, {

            loading: true,
            username: sessionStorage.getItem("USERNAME"),
            token: sessionStorage.getItem("TOKEN"),
            activeGame: sessionStorage.getItem("ACTIVEGAME")
        })
        
    }
}

export default new UserStore();