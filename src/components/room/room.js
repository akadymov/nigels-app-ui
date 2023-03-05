import React from 'react';

import './room.css'
import Cookies from 'universal-cookie';
import NaegelsApi from '../../services/naegels-api-service';

import FormButton from '../form-button';
import ActiveFrame from '../active-frame';
import ConfirmationPopup from '../confirmation-popup';
import InfoPopup from '../info-popup';
import { roomSocket, lobbySocket } from '../../services/socket';

export default class Room extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            roomDetails: {
                connectedUserList: [],
                host: '',
                status: 'open',
                games: []
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
                this.setState({popupError: body.errors[0].message})
            } else {
                roomSocket.emit('start_game_in_room', this.Cookies.get('username'), body.gameId, this.props.match.params.roomId)
                setTimeout(function(){
                    window.location.replace('/game/' + body.gameId)
                }, 1000)
            }
        })
    }

    disconnectRoom = (e) => {
        const roomId = this.state.roomDetails.roomId
        const roomName = this.state.roomDetails.roomName
        const username = e.target.id
        //if(username===this.state.roomDetails.host){
        //    this.setState({
        //        confirmActionMsg: 'Are you sure you want to leave room? It will be closed since you are host',
        //        confirmAction: this.confirmCloseRoom
        //    })
        //}
        this.NaegelsApi.disconnectRoom(this.Cookies.get('idToken'), roomId, username)
        .then((body) => {
            if(!body.errors){
                roomSocket.emit('remove_player_from_room', this.Cookies.get('username'), username, roomId, roomName, body.connectedUsers)
                lobbySocket.emit('decrease_room_players', this.Cookies.get('username'), username, roomId, roomName, body.connectedUsers)
                if(username === this.Cookies.get('username')){
                    window.location.replace('/lobby')
                } else {
                    var newRoomDetails = this.state.roomDetails
                    var disconnectedUserIndex = newRoomDetails.connectedUserList.findIndex(element => element.username === username )
                    if (disconnectedUserIndex > 0){
                        newRoomDetails.connectedUserList.splice(disconnectedUserIndex,1)
                        this.setState({ roomDetails: newRoomDetails })
                    }
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
                var newRoomDetails = this.state.roomDetails
                var targetUserUpdated = newRoomDetails.connectedUserList.findIndex(element => element.username === username )
                newRoomDetails.connectedUserList[targetUserUpdated].ready = 1
                this.setState({roomDetails: newRoomDetails})
                roomSocket.emit('ready', this.Cookies.get('username'), username, roomId)
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
                var newRoomDetails = this.state.roomDetails
                var targetUserUpdated = newRoomDetails.connectedUserList.findIndex(element => element.username === username )
                newRoomDetails.connectedUserList[targetUserUpdated].ready = 0
                this.setState({roomDetails: newRoomDetails})
                roomSocket.emit('not_ready', this.Cookies.get('username'), username, roomId)
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
        const roomName = this.state.roomDetails.roomName
        this.NaegelsApi.closeRoom(this.Cookies.get('idToken'), roomId)
        .then((body) => {
            if(body.errors){
                this.setState({popupError: body.errors[0].message})
            } else {
                roomSocket.emit('close_room', this.Cookies.get('username'), roomName);
                lobbySocket.emit('remove_room_from_lobby', roomName);
                this.setState({popupError: 'Room "' + roomName + '" was successfully closed!'})
                setTimeout(function(){
                    window.location.replace('/lobby' + roomId)
                }, 1000)
            }
        });
    }

    clearErrorMessage=(e) => {
        this.setState({startGameError: ""});
        this.setState({popupError:""});
        this.setState({confirmAction:""});
        this.setState({confirmActionMsg:""});
        this.GetRoomDetails();
    }

    redirect=() =>{
        if(this.state.nextUrl!==''){
            window.location.replace(this.state.nextUrl)
        }
    }

    openRoom = (e) => {
        this.setState({nextUrl:'/game/' + e.target.id})
    }
    
    componentWillMount = () => {
        this.GetRoomDetails();
      }

    render() {

        this.CheckIfAlreadyLoggedIn();
        this.redirect();

        roomSocket.on("update_room", (data) => {
            if(this.Cookies.get('username') != data.actor){
                if(data.roomId && data.username){
                    if(parseInt(data.roomId) === parseInt(this.state.roomDetails.roomId)){
                        if(data.event === 'ready'){
                            var newRoomDetails = this.state.roomDetails
                            var targetUserUpdated = newRoomDetails.connectedUserList.findIndex(element => element.username === data.username )
                            newRoomDetails.connectedUserList[targetUserUpdated].ready = 1
                            this.setState({roomDetails: newRoomDetails})
                        } else {
                            if(data.event === 'not ready'){
                                var newRoomDetails = this.state.roomDetails
                                var targetUserUpdated = newRoomDetails.connectedUserList.findIndex(element => element.username === data.username )
                                newRoomDetails.connectedUserList[targetUserUpdated].ready = 0
                                this.setState({roomDetails: newRoomDetails})
                            } else {
                                if (data.event === 'connect') {
                                    var newRoomDetails = this.state.roomDetails
                                    var userAlreadyInList = newRoomDetails.connectedUserList.findIndex(element => element.username === data.username )
                                    if (userAlreadyInList < 0) {
                                        var connectedUserArray = {
                                            'rating': 0,
                                            'username': data.username,
                                            'ready': 0
                                        }
                                        newRoomDetails.connectedUserList.push(connectedUserArray)
                                        this.setState({roomDetails: newRoomDetails})
                                    }
                                } else {
                                    if (data.event === 'disconnect') {
                                        if (data.actor !=  this.Cookies.get('username') & data.username === this.Cookies.get('username')){
                                            window.location.replace('/lobby')
                                        } else {
                                            var newRoomDetails = this.state.roomDetails
                                            var disconnectedUserIndex = newRoomDetails.connectedUserList.findIndex(element => element.username === data.username )
                                            if (disconnectedUserIndex > 0){
                                                newRoomDetails.connectedUserList.splice(disconnectedUserIndex, 1)
                                                this.setState({ roomDetails: newRoomDetails})
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        roomSocket.on("exit_room", (data) => {
            if(data.username === 0 || data.username === this.Cookies.get('username')){
                this.setState({nextUrl: '/lobby'})
            } else {
                this.GetRoomDetails()
            }
        });

        roomSocket.on("start_game", (data) => {
            if(data.username != this.Cookies.get('username')){
                var userConnected = this.state.roomDetails.connectedUserList.findIndex(element => element.username === this.Cookies.get('username') )
                if (userConnected >=0){
                    this.setState({nextUrl: '/game/' + data.gameId})
                }
            }
        });

        
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
                                            <img className="status" alt="status" ready={player.ready===1 ? 'true' : 'false'}></img>
                                        </td>
                                        <td className="room-table-cell">
                                            {((!this.state.youAreHost && player.username === this.Cookies.get('username') || this.state.youAreHost && player.username != this.Cookies.get('username')) && player.ready) ? 
                                                <FormButton 
                                                    type="hold" 
                                                    id={player.username} 
                                                    onClick={this.resetReady}
                                                ></FormButton>
                                             : ''}
                                            {((!this.state.youAreHost && player.username === this.Cookies.get('username') || this.state.youAreHost && player.username != this.Cookies.get('username') ) && !player.ready) ? 
                                                <FormButton 
                                                    type="confirm"  
                                                    id={player.username} 
                                                    onClick={this.confirmReady}
                                                ></FormButton> 
                                            : ''}
                                            {(!this.state.youAreHost && player.username === this.Cookies.get('username') || this.state.youAreHost && player.username != this.Cookies.get('username')) ? 
                                                <FormButton 
                                                    type="disconnect" 
                                                    id={player.username} 
                                                    onClick={this.disconnectRoom}
                                                ></FormButton> : ''}
                                        </td>
                                        <td className="room-table-cell">{player.rating}</td>
                                    </tr>   
                                )})}
                                </tbody>
                            </table>
                        </div>
                        <div className="games-table-container">     
                            <table className="games-table">
                                    <thead className="games-table-header">
                                        <tr className="games-tabe-row">
                                            <th className="games-table-cell" colSpan="2">
                                                Games in room
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="games-table-body">
                                        {this.state.roomDetails.games.map(game => {return(
                                            <tr className="games-tabe-row">
                                                <td className="games-table-cell">
                                                    {'Game #' + game.id + ' (' + game.status + ')'}
                                                </td>
                                                <td className="games-table-cell">
                                                    {game.status === 'open' ? 
                                                        <FormButton 
                                                            type="open"
                                                            id={game.id}
                                                            onClick={this.openRoom}
                                                        ></FormButton>
                                                    : ''}
                                                </td>
                                            </tr>
                                        )})}
                                    </tbody>
                                </table>
                        </div>
                        <div className="room-management-container">
                            <div className="start-game-button-container">
                                <FormButton
                                     type="Submit" 
                                     value="Start new game"
                                     onClick={this.startGame}
                                     disabled={this.Cookies.get('username') !== this.state.roomDetails.host || this.state.roomDetails.status !== 'open'}
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
                    <InfoPopup
                        popupError={this.state.popupError}
                        clearErrorMessage={this.clearErrorMessage}
                    ></InfoPopup>
                : ''}
                {this.state.confirmActionMsg !== '' ? 
                    <ConfirmationPopup
                        confirmAction={this.state.confirmAction}
                        confirmActionMsg={this.state.confirmActionMsg}
                        clearErrorMessage={this.clearErrorMessage}
                    ></ConfirmationPopup>
                : ''}
            </div>
            
        )
    }

}
