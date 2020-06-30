import React from 'react';

import './login-form.css'
import InputField from '../input-field';
import FormButton from '../form-button'

export default class LoginForm extends React.Component{

    render() {
        return (
            <div>
                <div className="active-frame">
                    <form className="login-form">
                        <InputField type="text" id="username" name ="username" placeholder="Username" errorMessage=""></InputField>
                        <InputField type="password" id="password" name ="password" placeholder="Password" errorMessage=""></InputField>
                        <FormButton type="submit" value="Submit"></FormButton>
                        <FormButton type="google" value="Sign in"></FormButton>
                        <FormButton type="facebook" value="Sign in"></FormButton>
                        <FormButton type="secondary" value="Register new player" onClick={() => this.props.history.push('/register/')}></FormButton>
                        <FormButton type="secondary" value="Forgot password"></FormButton>
                    </form>
                </div>
            </div>
        )
    }
}
