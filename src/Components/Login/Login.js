import React from 'react';
import LoginForm from './LoginForm';
import {observer} from 'mobx-react';

class Login extends React.Component {

    render() {
        return (
            <div className="loginContainer">
                <LoginForm {...this.props}/>
            </div>
        )
    }
}

export default observer(Login);