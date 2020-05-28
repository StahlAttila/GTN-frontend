import React from 'react';
import InputField from '../InputField'
import SubmitButton from '../SubmitButton';
import UserStore from '../../Store/UserStore';
import {Link} from 'react-router-dom';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            buttonDisabled: false
        }
    }

    setInputValue(property, val) {
        val = val.trim();
        if(val.lenght > 12) {
            return;
        }
        this.setState({
            [property]: val
        })
    }

    resetForm() {
        this.setState ({
            username: '',
            password: '',
            buttonDisabled: false
        })
    }

    async doLogin() {
        if (!this.state.username) {
            return;
        }
        if (!this.state.password) {
            return;
        }

        this.setState({
            buttonDisabled: true
        })

        try {
            
            const url = process.env.REACT_APP_API_URL;

            let res = await fetch(url + '/sign-in', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            });

            let result = await res.json();
            console.log(result)
            if(result && !result.status) {
                sessionStorage.setItem("USERNAME", result.username)
                sessionStorage.setItem("TOKEN", "Bearer " + result.jwt)
                UserStore.username = sessionStorage.getItem("USERNAME");
                UserStore.token = sessionStorage.getItem("TOKEN");
                UserStore.loading = false;
                this.props.history.push("/")
                
            } else {
                this.resetForm();
                console.log(result)
                alert(result.message);
            }
        }
        catch(e) {
            console.log(e);
            this.resetForm();
        }
    }

    render() {
        return (
            <div className="formContainer">
                <h1>Login</h1>
                <div className="loginForm">
                    <div className="usernameInput">
                        <i className="fa fa-user" aria-hidde="true"></i>
                        <InputField 
                            className="textInput"
                            type="text"
                            placeholder="Username"
                            value={this.state.username ? this.state.username : ''}
                            onChange={(val) => this.setInputValue('username', val)}
                        />
                    </div>
                    <div className="passwordInput">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                        <InputField
                            className="textInput" 
                            type="password"
                            placeholder="Password"
                            value={this.state.password ? this.state.password : ''}
                            onChange={(val) => this.setInputValue('password', val)}
                            
                        />
                    </div>
                    <div>
                        <SubmitButton
                                className="submitButton"
                                text={"Login"}
                                disabled={false}
                                onClick={() => this.doLogin() }
                            />
                        <div>
                            <p>Don't have an account yet? <Link className="redirectLink" to="/register">Sign up</Link></p>
                        </div>
                    </div>
                </div>
            </div>        
        )
    }
}

export default LoginForm;