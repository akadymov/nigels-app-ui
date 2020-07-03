import React from 'react';

import './info-popup.css'

import FormButton from '../form-button'

export default class InfoPopup extends React.Component{

    constructor(props) {
        super(props);
    };
    
    render() {
        return(
            <div className="info-popup">
                <p className="error-message">{this.props.popupError}</p>
                <FormButton
                    type="submit"
                    value="OK"
                    onClick={this.props.clearErrorMessage}
                >
                </FormButton>
            </div>
        )
    }
}
