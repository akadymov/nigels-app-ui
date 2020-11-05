import React from 'react';

import './betsize-popup.css';

import FormButton from '../form-button';
import InputField from '../input-field';

export default class BetSizePopup extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <div className="betsize-container">
                <div className="betsize-input">
                    Your bet size:
                    <InputField
                        type="number"
                        errorMessage={this.props.errorMessage}
                        onChange={this.props.onChange}
                        value={this.props.value}
                    ></InputField>
                </div>
                <div className="betsize-confirm">
                    <FormButton
                        type="Submit-small"
                        value="Confirm"
                        onClick={this.props.onSubmit}
                    ></FormButton>
                </div>
            </div>
        );
    }
}