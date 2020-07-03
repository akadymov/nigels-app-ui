import React from 'react';

import './room.css'
import Cookies from 'universal-cookie';
import NaegelsApi from '../../services/naegels-api-service';

import FormButton from '../form-button';
import ActiveFrame from '../active-frame';

export default class Room extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            roomDetails: {
                connectedUserList: [],
                host: ''
            },
            startGameError: '',
            popupError: '',
            confirmActionMsg:'',
            confirmAction:'',
            youAreHost: false,
            nextUrl: ''
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
        this.NaegelsApi.getRoom(this.props.match.params.roomId)
        .then((body) => {
            if(body.errors) {
                console.log('Something went wrong! Cannot get rooms list!')
            } else {
                this.setState({roomDetails: body})
                console.log(this.state.roomDetails.connectedUserList)
                if(body.host === this.Cookies.get('username')) {
                    this.setState({youAreHost: true})
                }
                if(this.state.roomDetails.status === 'closed') {
                    window.location.replace('/lobby')
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

    disconnectRoom = (e) => {
        const roomId = this.state.roomDetails.roomId
        const username = e.target.id
        if(username==this.state.roomDetails.host){
            this.setState({
                confirmActionMsg: 'Are you sure you want to leave room? It will be closed since you are host',
                confirmAction: this.confirmCloseRoom
            })
        }
        this.NaegelsApi.disconnectRoom(this.Cookies.get('idToken'), roomId, username)
        .then((body) => {
            if(!body.errors){
                if(username == this.Cookies.get('username')){
                    window.location.replace('/lobby')
                } else {
                    this.GetRoomDetails();
                }
            } else {
                this.setState({popupError: body.errors[0].message})
            }
        });
    }

    confirmReady = (e) => {
        const roomId = this.state.roomDetails.roomId
        const username = e.target.id
        this.NaegelsApi.confirmReady(this.Cookies.get('idToken'), roomId, username)
        .then((body) => {
            if(!body.errors){
                this.GetRoomDetails();
            } else {
                this.setState({popupError: body.errors[0].message})
            }
        });
    }

    resetReady = (e) => {
        const roomId = this.state.roomDetails.roomId
        const username = e.target.id
        this.NaegelsApi.resetReady(this.Cookies.get('idToken'), roomId, username)
        .then((body) => {
            if(!body.errors){
                this.GetRoomDetails();
            } else {
                this.setState({popupError: body.errors[0].message})
            }
        });
    }

    closeRoom = () => {
        this.setState({
            confirmActionMsg: 'Are you sure you want close room?',
            confirmAction: this.confirmCloseRoom
        })
    }

    confirmCloseRoom = () => {
        const roomId = this.state.roomDetails.roomId
        this.NaegelsApi.closeRoom(this.Cookies.get('idToken'), roomId)
        .then((body) => {
            if(body.errors){
                this.setState({popupError: body.errors[0].message})
            } else {
                this.setState({popupError: 'Room with id ' + roomId + ' was successfully closed!'})
                this.setState({nextUrl: '/lobby'})
                console.log(this.state.nextUrl)
            }
        });
    }

    clearErrorMessage=(e) => {
        this.setState({startGameError: ""});
        this.setState({popupError:""});
        this.setState({confirmAction:""});
        this.setState({confirmActionMsg:""});
    }

    redirect=() =>{
        if(this.state.nextUrl!==''){
            window.location.replace(this.state.nextUrl)
        }
    }
    
    componentWillMount = () => {
        this.GetRoomDetails();
      }

    render() {

        this.CheckIfAlreadyLoggedIn();
        this.redirect();
        
        return (
            <div>
                <ActiveFrame popupError={this.state.popupError} confirmActionMsg={this.state.confirmActionMsg}>
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
                                {this.state.roomDetails.connectedUserList.map(player => {return (
                                    <tr className="room-table-row" thisIsMe={player.username === this.Cookies.get('username') ? 'true' : 'false'}>
                                        <td className="room-table-cell">
                                            <p className="username" host={player.username === this.state.roomDetails.host ? 'true' : 'false'}>
                                                {player.username}
                                            </p>
                                        </td>
                                        <td className="room-table-cell">
                                            <img className="status" ready={player.ready===1 ? 'true' : 'false'}></img>
                                        </td>
                                        <td className="room-table-cell">
                                            {((this.state.youAreHost || player.username === this.Cookies.get('username') ) && player.ready) ? 
                                                <FormButton 
                                                    type="hold" 
                                                    id={player.username} 
                                                    onClick={this.resetReady}
                                                ></FormButton>
                                             : ''}
                                            {((this.state.youAreHost || player.username === this.Cookies.get('username') ) && !player.ready) ? 
                                                <FormButton 
                                                    type="confirm"  
                                                    id={player.username} 
                                                    onClick={this.confirmReady}
                                                ></FormButton> 
                                            : ''}
                                            {(this.state.youAreHost || player.username === this.Cookies.get('username')) ? 
                                                <FormButton 
                                                    type="disconnect" 
                                                    id={player.username} 
                                                    onClick={this.disconnectRoom}
                                                ></FormButton> : ''}
                                        </td>
                                        <td className="room-table-cell">{player.rating}</td>
                                        <td className="room-table-cell"></td>
                                    </tr>   
                                )})}
                                </tbody>
                            </table>
                        </div>
                        <div className="room-management-container">
                            <div className="start-game-button-container">
                                <FormButton
                                     type="Submit" 
                                     value="Start game"
                                     onClick={this.startGame}
                                     disabled={this.Cookies.get('username') !== this.state.roomDetails.host}
                                >
                                </FormButton>
                            </div>
                            <div className="close-room-button-container">
                                <FormButton
                                    type="Submit" 
                                    value="Close"
                                    id={this.state.roomDetails.roomId}
                                    onClick={this.closeRoom}
                                    disabled={this.Cookies.get('username')!==this.state.roomDetails.host}
                                ></FormButton>
                            </div>
                        </div>
                    </div>
                </ActiveFrame>
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
                {this.state.confirmActionMsg !== '' ? 
                    <div className="info-popup">
                        <p className="error-message">{this.state.confirmActionMsg}</p>
                        <div className="confirm-action-cancel-div">
                            <FormButton
                                type="secondary-big"
                                value="Cancel"
                                onClick={this.clearErrorMessage}
                            >
                            </FormButton>
                        </div>
                        <div className="confirm-action-ok-div">
                            <FormButton
                                type="submit"
                                value="OK"
                                onClick={this.state.confirmAction}
                            >
                            </FormButton>
                        </div>
                    </div>
                : ''}
            </div>
            
        )
    }

}
