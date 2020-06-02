import React from 'react';

import './main-frame.css'
import AppHeader from '../app-header';

const MainFrame = () => {
    return (
        <div>
            <div className="main-frame background-color">
                <AppHeader></AppHeader>
            </div>
            <div className="main-frame background-image"></div>
        </div>
    )
}

export default MainFrame;
