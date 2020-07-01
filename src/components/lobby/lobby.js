import React from 'react';

import './lobby.css'
import Cookies from 'universal-cookie';

import InputField from '../input-field';
import FormButton from '../form-button';

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
                        <p className="lobby-header">
                            Welcome back, {this.Cookies.get('username')}!
                        </p>
                    <div className="lobby-form">
                        <div className="lobby-table-container">
                            <table className="lobby-table">
                                <thead className="lobby-table-header">
                                    <tr className="lobby-table-row">
                                        <th className="lobby-table-cell">Room</th>
                                        <th className="lobby-table-cell">Host</th>
                                        <th className="lobby-table-cell">Created</th>
                                        <th className="lobby-table-cell">Players</th>
                                        <th className="lobby-table-cell"></th>
                                    </tr>
                                </thead>
                                <tbody className="lobby-table-body">
                                    <tr className="lobby-table-row">
                                        <td className="lobby-table-cell">1</td>
                                        <td className="lobby-table-cell">2</td>
                                        <td className="lobby-table-cell">3</td>
                                        <td className="lobby-table-cell">4</td>
                                        <td className="lobby-table-cell">5</td>
                                    </tr>
                                    <tr className="lobby-table-row">
                                        <td className="lobby-table-cell">1</td>
                                        <td className="lobby-table-cell">2</td>
                                        <td className="lobby-table-cell">3</td>
                                        <td className="lobby-table-cell">4</td>
                                        <td className="lobby-table-cell">5</td>
                                    </tr>
                                    <tr className="lobby-table-row">
                                        <td className="lobby-table-cell">1</td>
                                        <td className="lobby-table-cell">2</td>
                                        <td className="lobby-table-cell">3</td>
                                        <td className="lobby-table-cell">4</td>
                                        <td className="lobby-table-cell">5</td>
                                    </tr>
                                    <tr className="lobby-table-row">
                                        <td className="lobby-table-cell">1</td>
                                        <td className="lobby-table-cell">2</td>
                                        <td className="lobby-table-cell">3</td>
                                        <td className="lobby-table-cell">4</td>
                                        <td className="lobby-table-cell">5</td>
                                    </tr>
                                    <tr className="lobby-table-row">
                                        <td className="lobby-table-cell">1</td>
                                        <td className="lobby-table-cell">2</td>
                                        <td className="lobby-table-cell">3</td>
                                        <td className="lobby-table-cell">4</td>
                                        <td className="lobby-table-cell">5</td>
                                    </tr>
                                    <tr className="lobby-table-row">
                                        <td className="lobby-table-cell">1</td>
                                        <td className="lobby-table-cell">2</td>
                                        <td className="lobby-table-cell">3</td>
                                        <td className="lobby-table-cell">4</td>
                                        <td className="lobby-table-cell">5</td>
                                    </tr>
                                    <tr className="lobby-table-row">
                                        <td className="lobby-table-cell">1</td>
                                        <td className="lobby-table-cell">2</td>
                                        <td className="lobby-table-cell">3</td>
                                        <td className="lobby-table-cell">4</td>
                                        <td className="lobby-table-cell">5</td>
                                    </tr>
                                    <tr className="lobby-table-row">
                                        <td className="lobby-table-cell">1</td>
                                        <td className="lobby-table-cell">2</td>
                                        <td className="lobby-table-cell">3</td>
                                        <td className="lobby-table-cell">4</td>
                                        <td className="lobby-table-cell">5</td>
                                    </tr>
                                    <tr className="lobby-table-row">
                                        <td className="lobby-table-cell">1</td>
                                        <td className="lobby-table-cell">2</td>
                                        <td className="lobby-table-cell">3</td>
                                        <td className="lobby-table-cell">4</td>
                                        <td className="lobby-table-cell">5</td>
                                    </tr>
                                    <tr className="lobby-table-row">
                                        <td className="lobby-table-cell">1</td>
                                        <td className="lobby-table-cell">2</td>
                                        <td className="lobby-table-cell">3</td>
                                        <td className="lobby-table-cell">4</td>
                                        <td className="lobby-table-cell">5</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="lobby-management-container">
                            <div className="room-name-input-container">
                                <InputField
                                    type="text"
                                    id="roomName"
                                    name="roomName"
                                    placeholder="New room name"
                                    onChange=""
                                    errorMessage=""
                                    onClick=""
                                ></InputField>
                            </div>
                            <div className="create-room-button-container">
                                <FormButton
                                     type="Submit" 
                                     value="Create new room" 
                                     onClick=""
                                >
                                </FormButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }

}
