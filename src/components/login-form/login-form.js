import React from 'react';

import './login-form.css'
import InputField from '../input-field';
import FormButton from '../form-button';
import NaegelsApi from '../../services/naegels-api-service';

export default class LoginForm extends React.Component{

    constructor(props) {
        super(props);
        this.SendLoginRequest = this.SendLoginRequest.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleErrorResponse = this.handleErrorResponse.bind(this);
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

    SendLoginRequest = () => {
        this.NaegelsApi.login(
            this.state.username, 
            this.state.password
        )
        .then((body) => {
            if(body.errors) {
                this.handleErrorResponse(body)
            } else {
                window.location.replace('/registration-succeed/' + this.state.username);
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

    render() {
        return (
            <div>
                <div className="active-frame">
                    <div className="login-form">
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
