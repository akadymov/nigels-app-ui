import React from 'react';

import './lobby.css'
import Cookies from 'universal-cookie';

export default class Lobby extends React.Component{

    constructor(props) {
        super(props);
        this.CheckIfAlreadyLoggedIn = this.CheckIfAlreadyLoggedIn.bind(this);
        this.state = {

        }
    };

    Cookies = new Cookies();

    CheckIfAlreadyLoggedIn = () => {
        const idToken = this.Cookies.get('idToken')
        if(!idToken) {
            window.location.replace('/signin/expired');
        }
    }

    render() {

        this.CheckIfAlreadyLoggedIn();
        
        return (
            <div>
                <div className="lobby-frame">
                    <div className="lobby-form">
                        <div className="confirmation-container">
                            <h1 className="confirmation-message">
                                Lobby
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }

}
