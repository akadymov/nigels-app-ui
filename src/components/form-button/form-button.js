import React from 'react';

import './form-button.css'

const FormButton = ({type, value}) => {
    return (
        <button className="form-button" type={type}>{value}</button>
    )
}

export default FormButton;
