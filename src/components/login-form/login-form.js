import React from 'react';

import './login-form.css'
import InputField from '../input-field';
import FormButton from '../form-button';
import NaegelsApi from '../../services/naegels-api-service';
import Cookies from 'universal-cookie';

export default class LoginForm extends React.Component{

    constructor(props) {
        super(props);
        this.SendLoginRequest = this.SendLoginRequest.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleErrorResponse = this.handleErrorResponse.bind(this);
        this.clearErrorMessage = this.clearErrorMessage.bind(this);
        this.CheckIfAlreadyLoggedIn = this.CheckIfAlreadyLoggedIn.bind(this);
        this.state = {
            textFieldsList: [
                {id:"username", name:"username", type: "text", placeholder: "Username", onChange: this.handleUsernameChange, errorMessage: "", value: ""},
                {id:"password", name:"password", type: "password", placeholder: "Password", onChange: this.handlePasswordChange, errorMessage: "", value: ""}
            ],
            email:'',
            password:'',
            repeatPassword:'',
            username:''
        }
    };
    
    NaegelsApi = new NaegelsApi();
    Cookies = new Cookies();
    CheckIfAlreadyLoggedIn = () => {
        const idToken = this.Cookies.get('idToken')
        if(idToken) {
            window.location.replace('/lobby/');
        }
    }

    SendLoginRequest = () => {
        this.NaegelsApi.login(
            this.state.username, 
            this.state.password
        )
        .then((body) => {
            if(body.errors) {
                this.handleErrorResponse(body)
            } else {
                var currentDate = new Date(); 
                var expiresIn = new Date(currentDate.getTime() + body.expiresIn * 1000)
                this.Cookies.set('idToken', body.token, { path: '/' , expires: expiresIn})
                this.Cookies.set('username', this.state.username, { path: '/' , expires: expiresIn})
                window.location.replace('/lobby/');
            }
        });
    };

    handleUsernameChange=(e) => {
        this.setState({username: e.target.value})
    };

    handlePasswordChange=(e) => {
        this.setState({password: e.target.value})
    };

    
    handleErrorResponse(body) {
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

    clearErrorMessage=(e) => {
        let textFieldsListUpdated = [...this.state.textFieldsList]
        var elementsIndex = this.state.textFieldsList.findIndex(element => element.id === e.target.id )
        textFieldsListUpdated[elementsIndex] = {...textFieldsListUpdated[elementsIndex], errorMessage: ""}
        this.setState({textFieldsList: textFieldsListUpdated});
    }

    render() {

        this.CheckIfAlreadyLoggedIn();

        return (
            <div>
                <div className="active-frame">
                    <div className="login-form">
                    {this.props.match.params.reason==='expired' ? <p className="errorDiv"><b>You have to sign in to access application</b></p> : ''}
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
                        <FormButton type="Submit" value="Submit" onClick={this.SendLoginRequest}></FormButton>
                        <FormButton type="google" value="Sign in"></FormButton>
                        <FormButton type="facebook" value="Sign in"></FormButton>
                        <FormButton type="secondary" value="Register new player" onClick={() => this.props.history.push('/register/')}></FormButton>
                        <FormButton type="secondary" value="Forgot password"></FormButton>
                    </div>
                </div>
            </div>
        )
    }
}
