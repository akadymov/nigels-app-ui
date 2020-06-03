import React from 'react';

import './main-frame.css'
import AppHeader from '../app-header';
import ActiveFrame from '../active-frame';

const MainFrame = () => {
    return (
        <div>
            <div className="main-frame content">
                <AppHeader></AppHeader>
                <ActiveFrame></ActiveFrame>
            </div>
            <div className="main-frame background-color"></div>
            <div className="main-frame background-image"></div>
        </div>
    )
}

export default MainFrame;
