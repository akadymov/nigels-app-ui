import React from 'react';

import './input-field.css'

const InputField = ({type, id, name, placeholder, value, onChange}) => {
    return (
        <input 
            className="input-field"
            type={type} 
            id={id} 
            name={name} 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange}
        ></input>
    )
}

export default InputField;