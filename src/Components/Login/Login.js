import React from 'react';
import LoginForm from './LoginForm';
import {observer} from 'mobx-react';

class Login extends React.Component {

    render() {
        return (
            <LoginForm {...this.props}/>
        )
    }
}

export default observer(Login);