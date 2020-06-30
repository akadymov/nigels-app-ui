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
        this.clearErrorMessage = this.clearErrorMessage.bind(this);
        this.state = {
            email:'',
            password:'',
            repeatPassword:'',
            username:'',
            preferredLang: '',
            textFieldsList: [
                {id:"username", name:"username", type: "text", placeholder: "Username", onChange: this.handleUsernameChange, errorMessage: "", value: ""},
                {id:"email", name:"email", type: "text", placeholder: "Email", onChange: this.handleEmailChange, errorMessage: "", value: ""},
                {id:"password", name:"password", type: "password", placeholder: "Password", onChange: this.handlePasswordChange, errorMessage: "", value: ""},
                {id:"repeatPassword", name:"repeatPassword", type: "password", placeholder: "Repeat password", onChange: this.handleRepeatPasswordChange, errorMessage: "", value: ""}
            ],
            languages: [
                {type:"radio", id:"preferred-lang", name:"preferred-lang", lang:"en", errorMessage:""},
                {type:"radio", id:"preferred-lang", name:"preferred-lang", lang:"ru", errorMessage:""}
            ]
      };
    }

    NaegelsApi = new NaegelsApi();

    SendRegRequest = () => {
        this.NaegelsApi.registerUser(
            this.state.email, 
            this.state.username, 
            this.state.password, 
            this.state.repeatPassword,
            this.state.preferredLang
        )
        .then((body) => {
            if(body.errors) {
                this.handleErrorResponse(body)
            } else {
                window.location.replace('/registration-succeed/' + this.state.username);
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

    handleLangChange=(e) => {
        this.setState({preferredLang: e.target.value})
    };

    clearErrorMessage=(e) => {
        let textFieldsListUpdated = [...this.state.textFieldsList]
        var elementsIndex = this.state.textFieldsList.findIndex(element => element.id === e.target.id )
        textFieldsListUpdated[elementsIndex] = {...textFieldsListUpdated[elementsIndex], errorMessage: ""}
        this.setState({textFieldsList: textFieldsListUpdated});
    }

    handleErrorResponse=(body) => {
        let textFieldsListUpdated = [...this.state.textFieldsList]
        textFieldsListUpdated.forEach(f => {
            f.errorMessage="";
        })
        body.errors.forEach(er => {
            var elementsIndex = this.state.textFieldsList.findIndex(element => element.name === er.field )
            textFieldsListUpdated[elementsIndex] = {...textFieldsListUpdated[elementsIndex], errorMessage: er.message}
        });
        this.setState({textFieldsList: textFieldsListUpdated});
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
                                    onClick={this.clearErrorMessage}
                                ></InputField>
                            })}
                            <p className="form-label">Preferred language</p>
                            {this.state.languages.map(lang => {
                                return <div className="lang-label" lang={lang.lang}>
                                    <InputField
                                        type={lang.type}
                                        id={lang.id}
                                        name={lang.name}
                                        lang={lang.lang}
                                        errorMessage={lang.errorMessage}
                                        checked={this.state.preferredLang === lang.lang}
                                        onChange={this.handleLangChange}
                                        value={lang.lang}
                                    ></InputField>
                                </div>  
                            })}
                            <FormButton 
                                value="Register"
                                type="Submit"
                                onClick={this.SendRegRequest}
                            ></FormButton>
                            <FormButton 
                                type="secondary" 
                                value="Sign in"
                                onClick={() => this.props.history.push('/signin')}
                            ></FormButton>
                        </div>
                    </div>
                </div>
                
            )
    }
}
