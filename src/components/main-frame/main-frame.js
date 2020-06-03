import React from 'react';

import './main-frame.css'
import AppHeader from '../app-header';
import LoginForm from '../login-form';
import { Switch, Route } from 'react-router-dom';

const MainFrame = () => {
    return (
        <div>
            <div className="main-frame content">
                <AppHeader></AppHeader>
                <Switch>
                    <Route exact path="/signin" component={LoginForm}></Route>
                </Switch>
            </div>
            <div className="main-frame background-color"></div>
            <div className="main-frame background-image"></div>
        </div>
    )
}

export default MainFrame;
