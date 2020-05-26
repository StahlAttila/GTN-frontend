import React from 'react';
import InputField from '../InputField'
import SubmitButton from '../SubmitButton';
import UserStore from '../../Store/UserStore';

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
            
            let res = await fetch('https://gtn-api.herokuapp.com/sign-in', {
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
            <div className="loginForm">
                Login Form
                <InputField 
                    type="text"
                    placeholder="Username"
                    value={this.state.username ? this.state.username : ''}
                    onChange={(val) => this.setInputValue('username', val)}
                />
                <InputField 
                    type="password"
                    placeholder="Password"
                    value={this.state.password ? this.state.password : ''}
                    onChange={(val) => this.setInputValue('password', val)}
                    
                />
                <SubmitButton
                        text={"Login"}
                        disabled={false}
                        onClick={() => this.doLogin() }
                    />
            </div>
        )
    }
}

export default LoginForm;