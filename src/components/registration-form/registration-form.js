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
            errors: [],
            textFieldsList: [
                {id:"username", name:"username", type: "text", placeholder: "Username", onChange: this.handleUsernameChange, errorMessage: "", value: ""},
                {id:"email", name:"email", type: "text", placeholder: "Email", onChange: this.handleEmailChange, errorMessage: "", value: ""},
                {id:"password", name:"password", type: "password", placeholder: "Password", onChange: this.handlePasswordChange, errorMessage: "", value: ""},
                {id:"repeatPassword", name:"repeatPassword", type: "password", placeholder: "Repeat password", onChange: this.handleRepeatPasswordChange, errorMessage: "", value: ""},
            ]
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
            if(body.errors) {
                this.handleErrorResponse(body)
                console.log('error!')
            }
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
        let textFieldsListUpdated = [...this.state.textFieldsList]
        textFieldsListUpdated.forEach(f => {
            f.errorMessage="";
        })
        body.errors.forEach(er => {
            var elementsIndex = this.state.textFieldsList.findIndex(element => element.name == er.field )
            textFieldsListUpdated[elementsIndex] = {...textFieldsListUpdated[elementsIndex], errorMessage: er.message}
        });
        this.setState({textFieldsList: textFieldsListUpdated});
        console.log(this.state.textFieldsList)
    }

    render() {

        return (
                <div>
                    <div className="active-frame">
                        <div className="registration-form">
                            {this.state.textFieldsList.map(field => {
                                return <InputField
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    onChange={field.onChange}
                                    errorMessage={field.errorMessage}
                                ></InputField>
                            })}
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