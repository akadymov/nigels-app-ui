import React from 'react';

import './main-frame.css'
import AppHeader from '../app-header';
import LoginForm from '../login-form';
import { Switch, Route } from 'react-router-dom';
import RegistrationForm from '../registration-form';
import SuccessfullRegistration from '../successfull-registration';
import Lobby from '../lobby';




const MainFrame = () => {
    return (
        <div>
            <div className="main-frame content">
                <AppHeader></AppHeader>
                <Switch>
                    <Route path="/signin/:reason" component={LoginForm}></Route>
                    <Route path="/signout" component={LoginForm}></Route>
                    <Route path="/register" component={RegistrationForm}></Route>
                    <Route path="/registration-succeed/:username" component={SuccessfullRegistration}></Route>
                    <Route path="/lobby" component={Lobby}></Route>
                    <Route path="/" component={LoginForm}></Route>
                </Switch>
            </div>
            <div className="main-frame background-color"></div>
            <div className="main-frame background-image"></div>
        </div>
    )
}

export default MainFrame;
