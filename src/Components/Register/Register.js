import React from 'react';
import RegisterForm from './RegisterForm';
import {observer} from 'mobx-react';

class Register extends React.Component {

    render() {
        return (
            <div className="loginContainer">
                <RegisterForm {...this.props}/>
            </div>
        )
    }
}

export default observer(Register);