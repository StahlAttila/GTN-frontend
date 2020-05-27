import React from 'react';
import LoginForm from './LoginForm';
import {observer} from 'mobx-react';
import { Link } from 'react-router-dom';

class Login extends React.Component {

    render() {
        return (
            <div className="loginContainer">
                <LoginForm {...this.props}/>
                <Link to="/register">Don't have an account yet?</Link>
            </div>
        )
    }
}

export default observer(Login);