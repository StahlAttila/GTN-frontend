import React from 'react';
import InputField from '../InputField'
import SubmitButton from '../SubmitButton';

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
            
            let res = await fetch('https://gtn-api.herokuapp.com/sign-up', {
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
            <div className="registerForm">
                Login Form
                <InputField 
                    type="text"
                    placeholder="Username"
                    value={this.state.username ? this.state.username : ''}
                    onChange={(val) => this.setInputValue('username', val)}
                />
                <InputField 
                    type="email"
                    placeholder="example@example.com"
                    value={this.state.email ? this.state.email : ''}
                    onChange={(val) => this.setInputValue('email', val)}
                    
                />
                <InputField 
                    type="password"
                    placeholder="Password"
                    value={this.state.password ? this.state.password : ''}
                    onChange={(val) => this.setInputValue('password', val)}
                    
                />
                <SubmitButton
                        text={"Sign up"}
                        disabled={false}
                        onClick={() => this.doRegister() }
                    />
            </div>
        )
    }
}

export default RegisterForm;