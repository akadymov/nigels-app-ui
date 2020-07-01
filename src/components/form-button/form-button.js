import React from 'react';

import './form-button.css'

const FormButton = ({ type, value, onClick, id , disabled}) => {
    return (
        <button 
            className="form-button" 
            type={type} 
            onClick={onClick} 
            id={id} 
            disabled={disabled}
        >
            {value}
        </button>
    )
}

export default FormButton;