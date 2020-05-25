import React from 'react';
import LoginForm from './LoginForm';
import UserStore from '../../Store/UserStore';
import SubmitButton from '../SubmitButton';
import {observer} from 'mobx-react';

class Login extends React.Component {

    doLogout () {
        UserStore.toke = '';
    }

    render() {

        if (UserStore.token != "") {
            return (
                <div>
                    welcome {UserStore.username}
                    <SubmitButton
                        text={"Logout"}
                        disabled={false}
                        onClick={() => this.doLogout() }
                    />
                </div>
            )
        }
        return (
            <div className="loginContainer">
                <LoginForm {...this.props}/>
            </div>
        )
    }
}

export default observer(Login);