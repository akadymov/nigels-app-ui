import React from 'react';

import './active-frame.css'
import LoginForm from '../login-form'

const ActiveFrame = () => {
    return (
        <div>
            <div className="active-frame">
                <LoginForm></LoginForm>
            </div>
        </div>
    )
}

export default ActiveFrame;
