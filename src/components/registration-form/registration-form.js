import React from 'react';

import './registration-form.css'
import InputField from '../input-field';
import FormButton from '../form-button'

const RegistrationForm = () => {
    return (
        <div>
            <div className="active-frame">
                <form className="login-form">
                    <InputField type="text" id="username" name ="username" placeholder="Username"></InputField>
                    <InputField type="text" id="email" name ="email" placeholder="Email"></InputField>
                    <InputField type="password" id="password" name ="password" placeholder="Password"></InputField>
                    <InputField type="password" id="repeat-password" name ="repeat-password" placeholder="Repeat password"></InputField>
                    <p className="form-label">Preferred language</p>
                    
                    <div className="lang-label" lang="en"><InputField type="radio" id="preferred-lang" name="preferred-lang" lang="en"></InputField></div>
                    
                    <div className="lang-label" lang="ru"><InputField type="radio" id="preferred-lang" name="preferred-lang" lang="ru"></InputField></div>
                    <FormButton type="submit" value="Register"></FormButton>
                    <FormButton type="secondary" value="Sign in"></FormButton>
                </form>
            </div>
        </div>
        
    )
}

export default RegistrationForm;
