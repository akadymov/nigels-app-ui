import React from 'react';

import './confirmation-popup.css'

import FormButton from '../form-button'

export default class ConfirmationPopup extends React.Component{
    
    render() {
        return (
            <div className="info-popup">

            <div className="popup-container">
                <p className="error-message">{this.props.confirmActionMsg}</p>
                <div className="confirm-action-cancel-div">
                    <FormButton
                        type="secondary-big"
                        value="Cancel"
                        onClick={this.props.clearErrorMessage}
                    >
                    </FormButton>
            </div>
                <div className="confirm-action-ok-div">
                    <FormButton
                        type="submit"
                        value="OK"
                        onClick={this.props.confirmAction}
                    >
                    </FormButton>
                </div>

                </div>
            </div>
        )
    }
}
