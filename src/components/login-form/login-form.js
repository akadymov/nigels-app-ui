import React from 'react';

import './login-form.css'
import InputField from '../input-field';
import FormButton from '../form-button'

const LoginForm = () => {
    return (
        <form className="login-form">
            <InputField type="text" id="username" name ="username" placeholder="Username"></InputField>
            <InputField type="password" id="password" name ="password" placeholder="Password"></InputField>
            <FormButton type="submit" value="Submit"></FormButton>
            <FormButton type="google" value="Sign in"></FormButton>
            <FormButton type="facebook" value="Sign in"></FormButton>
            <FormButton type="secondary" value="Register new player"></FormButton>
            <FormButton type="secondary" value="Forgot password"></FormButton>
        </form>
    )
}

export default LoginForm;
