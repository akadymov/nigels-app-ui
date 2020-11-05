import React from 'react';

import './app-header.css'
import MainLogo from '../main-logo';
import NavigationPanel from '../navigation-panel';

const AppHeader = () => {
    return (
        <div className="app-header">
            <MainLogo></MainLogo>
            <NavigationPanel> </NavigationPanel>
            <hr className="header-underline"></hr>
        </div>
    )
}

export default AppHeader;
