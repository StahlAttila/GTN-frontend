import React from 'react';
import InputField from '../InputField'
import SubmitButton from '../SubmitButton';
import {Link} from 'react-router-dom';

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
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

    async doRegister() {
        if (!this.state.username) {
            return;
        }
        if (!this.state.password) {
            return;
        }
        if (!this.state.email) {
            return;
        }

        this.setState({
            buttonDisabled: true
        })

        try {
            
            const url = process.env.REACT_APP_API_URL;

            let res = await fetch(url + '/sign-up', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                })
            });

            let result = await res.json();
            console.log(result)
            if(result && !result.status) {   
                this.props.history.push("/login")
                
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
                <h1>Register</h1>
                <div className="registerForm">
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
                    <div className="emailInput">
                        <i className="fa fa-envelope" aria-hidde="true"></i>
                        <InputField 
                            className="textInput"
                            type="email"
                            placeholder="example@example.com"
                            value={this.state.email ? this.state.email : ''}
                            onChange={(val) => this.setInputValue('email', val)}
                        />
                    </div>
                    <div className="passwordInput">
                        <i className="fa fa-lock" aria-hidde="true"></i>
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
                            text={"Sign up"}
                            disabled={false}
                            onClick={() => this.doRegister() }
                            />
                        <div>
                            <p>Already have an account? <Link className="redirectLink" to="/login">Sign in</Link></p>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default RegisterForm;