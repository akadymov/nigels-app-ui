import React from 'react';

import './form-button.css'

const FormButton = ({ type, value, onClick, id , disabled, display, data }) => {
    return (
        <button 
            className="form-button" 
            type={type} 
            onClick={onClick} 
            id={id} 
            disabled={disabled}
            display={display}
            data={data}
        >
            {value}
        </button>
    )
}

export default FormButton;