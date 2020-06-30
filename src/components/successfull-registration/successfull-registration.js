import React from 'react';

import './successfull-registration.css'
import FormButton from '../form-button';

export default class SuccessfullRegistration extends React.Component{

    render() {
        return (
            <div>
                <div className="confirmation-frame">
                    <div className="reg-confirmation-form">
                        <div className="confirmation-container">
                            <p className="confirmation-message">
                                User <b>{this.props.match.params.username}</b> was successfully registered.
                            </p>
                        </div>
                        <FormButton 
                            value="Sign in"
                            type="Submit"
                            onClick={() => this.props.history.push('/signin')}
                        ></FormButton>
                        <FormButton 
                            value="Register another user"
                            type="secondary" 
                            onClick={() => this.props.history.push('/register')}
                        ></FormButton>
                    </div>
                </div>
            </div>
            
        )
    }

}
