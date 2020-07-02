import React from 'react';

import './room.css'
import Cookies from 'universal-cookie';
import NaegelsApi from '../../services/naegels-api-service';

import FormButton from '../form-button';

export default class Room extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            roomDetails: {
                connectedUsers: [],
                host: ''
            },
            startGameError: '',
            popupError: '',
            youAreHost: false
        }
    };

    Cookies = new Cookies();
    NaegelsApi = new NaegelsApi();

    CheckIfAlreadyLoggedIn = () => {
        const idToken = this.Cookies.get('idToken')
        if(!idToken) {
            window.location.replace('/signin/expired');
        }
    }

    GetRoomDetails = () => {
        this.NaegelsApi.getRoom(this.Cookies.get('idToken'), this.props.match.params.roomId)
        .then((body) => {
            if(body.errors) {
                console.log('Something went wrong! Cannot get rooms list!')
            } else {
                this.setState({roomDetails: body})
                console.log(this.state.roomDetails.connectedUsers)
                if(body.host === this.Cookies.get('username')) {
                    this.setState({youAreHost: true})
                }
            }
        });
    };

    handleStartGameError=(body) => {
        this.setState({startGameError: body.errors[0].message});
    }

    startGame = () => {
        this.NaegelsApi.startGame(this.Cookies.get('idToken'), this.state.newRoomName)
        .then((body) => {
            if(body.errors) {
                this.handleCreateRoomError(body)
            } else {
                console.log(body)
            }
        })
    }

    disconnectRoom = () => {
        const roomId = this.state.roomDetails.roomId
        this.NaegelsApi.disconnectRoom(this.Cookies.get('idToken'), roomId)
        .then((body) => {
            if(!body.errors){
                window.location.replace('/lobby')
            } else {
                this.setState({popupError: body.errors.message})
            }
        });
    }

    clearErrorMessage=(e) => {
        this.setState({startGameError: ""});
        this.setState({popupError:""})
    }
    
    componentWillMount = () => {
        this.GetRoomDetails();
      }

    render() {

        this.CheckIfAlreadyLoggedIn();
        
        return (
            <div>
                <div className="room-frame" popupError={this.state.popupError}>
                        <p className="room-header">
                            {this.state.roomDetails.roomName}
                        </p>
                        <p className="room-h2">
                            Room Lobby
                        </p>
                    <div className="room-form">
                        <div className="room-table-container">
                            <table className="room-table">
                                <thead className="room-table-header">
                                    <tr className="room-table-row">
                                        <th className="room-table-cell">Player</th>
                                        <th className="room-table-cell">Ready</th>
                                        <th className="room-table-cell">Actions</th>
                                        <th className="room-table-cell">Overall rating</th>
                                        <th className="room-table-cell">
                                            <FormButton
                                                type="small-submit" 
                                                value="Refresh" 
                                                onClick={this.GetRoomDetails}
                                            >
                                            </FormButton>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="room-table-body">
                                {this.state.roomDetails.connectedUsers.map(player => {return (
                                    <tr className="room-table-row" thisIsMe={player.username === this.Cookies.get('username') ? 'true' : 'false'}>
                                        <td className="room-table-cell">
                                            <p className="username" host={player.username === this.state.roomDetails.host ? 'true' : 'false'}>
                                                {player.username}
                                            </p>
                                        </td>
                                        <td className="room-table-cell">
                                            <img className="status" ready={player.ready ? 'true' : 'false'}></img>
                                        </td>
                                        <td className="room-table-cell">
                                            {(this.state.youAreHost) ? <FormButton type="kick" onClick={console.log('Kick Method is not developed yet!')}></FormButton> : ''}
                                            {((this.state.youAreHost || player.username === this.Cookies.get('username') ) && !player.ready) ? <FormButton type="confirm" onClick={console.log('Player status confirmation method is not developed yet!')}></FormButton> : ''}
                                            {(player.username === this.Cookies.get('username')) ? <FormButton type="disconnect" onClick={this.disconnectRoom}></FormButton> : ''}
                                        </td>
                                        <td className="room-table-cell">{player.rating}</td>
                                        <td className="room-table-cell"></td>
                                    </tr>   
                                )})}
                                </tbody>
                            </table>
                        </div>
                        <div className="room-management-container">
                            <div className="create-room-button-container">
                                <FormButton
                                     type="Submit" 
                                     value="Start game"
                                     onClick={this.startGame}
                                     disabled={this.Cookies.get('username') !== this.state.roomDetails.host}
                                >
                                </FormButton>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.popupError !== '' ? 
                    <div className="info-popup">
                        <p className="error-message">{this.state.popupError}</p>
                        <FormButton
                            type="submit"
                            value="OK"
                            onClick={this.clearErrorMessage}
                        >
                        </FormButton>
                    </div>
                : ''}
            </div>
            
        )
    }

}
