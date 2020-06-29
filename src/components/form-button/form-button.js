import React from 'react';

import './form-button.css'

const FormButton = ({ type, value, onClick }) => {
    return (
        <button className="form-button" type={type} onClick={onClick}>{value}</button>
    )
}

export default FormButton;