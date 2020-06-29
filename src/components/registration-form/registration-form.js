import React from 'react';

import './registration-form.css'
import InputField from '../input-field';
import FormButton from '../form-button';
import NaegelsApi from '../../services/naegels-api-service';

export default class RegistrationForm extends React.Component{

    constructor(props) {
        super(props);
        this.SendRegRequest = this.SendRegRequest.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
        this.handleErrorResponse = this.handleErrorResponse.bind(this);
        this.state = {
            email:'',
            password:'',
            repeatPassword:'',
            username:'',
            errorField: '',
            errorMessage: ''
      };
    }

    NaegelsApi = new NaegelsApi();

    SendRegRequest = () => {
        this.NaegelsApi.registerUser(
            this.state.email, 
            this.state.username, 
            this.state.password, 
            this.state.repeatPassword
        )
        .then((body) => { 
            if(body.error) {
                this.handleErrorResponse(body)
            }
            console.log(body);
        });
    };

    handleUsernameChange(e) {
        this.setState({username: e.target.value})
    };

    handlePasswordChange(e) {
        this.setState({password: e.target.value})
    };

    handleRepeatPasswordChange(e) {
        this.setState({repeatPassword: e.target.value})
    };

    handleEmailChange(e) {
        this.setState({email: e.target.value})
    };

    handleErrorResponse(body) {
        this.setState({
            errorField: body.incorrect_fields[0],
            errorMessage: body.error
        })
        console.log(this.state.errorField, this.state.errorMessage)
    }

    render() {
        return (
                <div>
                    <div className="active-frame">
                        <div className="registration-form">
                            <InputField 
                                type="text" 
                                id="username" 
                                name="username" 
                                placeholder="Username" 
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                                errorField={this.state.errorField}
                                errorMessage={this.state.errorMessage}
                            ></InputField>
                            <InputField 
                                type="text" 
                                id="email" 
                                name ="email" 
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                                errorField={this.state.errorField}
                                errorMessage={this.errorMessage}
                            ></InputField>
                            <InputField 
                                type="password" 
                                id="password" 
                                name ="password" 
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                errorField={this.state.errorField}
                                errorMessage={this.state.errorMessage}
                            ></InputField>
                            <InputField 
                                type="password" 
                                id="repeat-password" 
                                name ="repeat-password" 
                                placeholder="Repeat password"
                                value={this.state.repeatPassword}
                                onChange={this.handleRepeatPasswordChange}
                                errorField={this.state.errorField}
                                errorMessage={this.state.errorMessage}
                            ></InputField>
                            <p className="form-label">Preferred language</p>
                            <div className="lang-label" lang="en"><InputField type="radio" id="preferred-lang" name="preferred-lang" lang="en"></InputField></div>
                            <div className="lang-label" lang="ru"><InputField type="radio" id="preferred-lang" name="preferred-lang" lang="ru"></InputField></div>
                            <FormButton 
                                value="Register"
                                type="Submit"
                                onClick={this.SendRegRequest}
                            ></FormButton>
                            <FormButton 
                                type="secondary" 
                                value="Sign in"
                            ></FormButton>
                        </div>
                    </div>
                </div>
                
            )
    }
}