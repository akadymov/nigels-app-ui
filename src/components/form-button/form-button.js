import React from 'react';

import './form-button.css'

const FormButton = ({ type, value, onClick, id , disabled, display }) => {
    return (
        <button 
            className="form-button" 
            type={type} 
            onClick={onClick} 
            id={id} 
            disabled={disabled}
            display={display}
        >
            {value}
        </button>
    )
}

export default FormButton;