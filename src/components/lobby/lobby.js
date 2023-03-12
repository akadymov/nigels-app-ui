import React from 'react';

import './lobby.css'
import Cookies from 'universal-cookie';
import NaegelsApi from '../../services/naegels-api-service';

import InputField from '../input-field';
import FormButton from '../form-button';
import ActiveFrame from '../active-frame';
import InfoPopup from '../info-popup';
import { roomSocket, lobbySocket } from '../../services/socket';




export default class Lobby extends React.Component{

    constructor(props) {
        super(props);
        this.GetRoomsList = this.GetRoomsList.bind(this);
        this.state = {
            rooms: [],
            newRoomName: '',
            newRoomError:'',
            popupError:'',
            confirmActionMsg:'',
            confirmAction:''
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

    GetRoomsList = () => {
        this.NaegelsApi.getRooms()
        .then((body) => {
            if(body.errors) {
                console.log('Something went wrong! Cannot get rooms list!')
            } else {
                const newRooms = []
                body.rooms.forEach(r => {
                    //TODO: format created timestamp (firstly, convert all dates to numbers in server responses)
                    r.id = r.roomId
                    newRooms.push(r)
                });
                this.setState({rooms: newRooms})
            }
        });
    };

    connectRoom = (e) => {
        // debugger;
        const roomId = e.target.id
        this.NaegelsApi.connectRoom(this.Cookies.get('idToken'), roomId)
        .then((body) => {
            if(!body.errors){
                roomSocket.emit('add_player_to_room', this.Cookies.get('username'), roomId, body.roomName, body.connectedUsers)
                lobbySocket.emit('increase_room_players', this.Cookies.get('username'), roomId, body.roomName, body.connectedUsers)
                console.log('connect_to_room')
                setTimeout(function(){
                    window.location.replace('/lobby/room/' + roomId)
                }, 1000)
            } else {
                this.setState({popupError: body.errors[0].message})
            }
        });
    }

    openRoom = (e) => {
        const roomId = e.target.id
        window.location.replace('/lobby/room/' + roomId)
    }

    handleNewRoomNameChange = (e) => {
        this.setState({ newRoomName: e.target.value })
    }

    handleCreateRoomError=(body) => {
        this.setState({newRoomError: body.errors[0].message});
    }
    
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          this.createNewRoom();
        }
      };

    createNewRoom = () => {
        this.NaegelsApi.createRoom(this.Cookies.get('idToken'), this.state.newRoomName)
        .then((body) => {
            if(body.errors) {
                this.handleCreateRoomError(body)
            } else {
                lobbySocket.emit('create_room', body.roomId, body.roomName, body.host, body.created)
                console.log('create_room')
                window.location.replace('/lobby/room/' + body.roomId);
            }
        })
    }

    clearErrorMessage=(e) => {
        this.setState({newRoomError: ""});
        this.setState({popupError: ""});
        this.setState({confirmActionMsg: ""});
        this.setState({confirmAction: ""});
        this.GetRoomsList()
    }
    
    componentWillMount = () => {
        this.GetRoomsList();
      }

    render() {

        this.CheckIfAlreadyLoggedIn();

        lobbySocket.on('update_lobby', (data) => {
            if(data.event === 'close'){
                var newRooms = this.state.rooms
                var createdRoomIndex = newRooms.findIndex(element => element.roomName === data.roomName )
                if (createdRoomIndex >= 0) {
                    newRooms.splice(createdRoomIndex, 1)
                    this.setState({rooms: newRooms})
                }
            } else {
                if(data.event === 'create'){
                    var roomIsAlreadyDisplayed = this.state.rooms.findIndex(element => element.roomName === data.roomName )
                    if (roomIsAlreadyDisplayed < 0) {
                        var newRooms = this.state.rooms
                        newRooms.push({
                            'closed': null,
                            'connectedUsers': 1,
                            'created': data.created,
                            'games': [],
                            'host': data.host,
                            'roomId': data.roomId,
                            'roomName': data.roomName,
                            'status': 'open'
                        })
                        this.setState({rooms: newRooms})
                    }
                    
                } else {
                    if(data.event === 'connect' || data.event === 'disconnect') {
                        var newRooms = this.state.rooms
                        console.log(newRooms)
                        console.log(data)
                        var updatedRoomIndex = newRooms.findIndex(element => element.roomName === data.roomName )
                        newRooms[updatedRoomIndex].connectedUsers = data.connectedUsers
                        this.setState({ rooms: newRooms })
                    }
                }
            }
        })
        
        return (
            <div>
                <ActiveFrame popupError={this.state.popupError} confirmActionMsg={this.state.confirmActionMsg}>
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
                                        <th className="lobby-table-cell">Status</th>
                                        <th className="lobby-table-cell">
                                            <FormButton
                                                type="small-submit" 
                                                value="Refresh" 
                                                onClick={this.GetRoomsList}
                                            >
                                            </FormButton>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="lobby-table-body">
                                {this.state.rooms.map(room => {return (
                                    <tr className="lobby-table-row">
                                        <td className="lobby-table-cell">
                                            <a className="room-href" href={'/lobby/room/' + room.roomId}>{room.roomName}</a>
                                        </td>
                                        <td className="lobby-table-cell">{room.host}</td>
                                        <td className="lobby-table-cell">{room.created}</td>
                                        <td className="lobby-table-cell">{room.connectedUsers} / 6</td>
                                        <td className="lobby-table-cell">{room.status}</td>
                                        <td className="lobby-table-cell">
                                            {this.Cookies.get('username')===room.host ? 
                                                <FormButton
                                                    type="small-submit" 
                                                    value="Open"
                                                    id={room.roomId}
                                                    onClick={this.openRoom}
                                                    disabled={room.status !== 'open'}
                                                >   
                                                </FormButton> :
                                                <FormButton
                                                    type="small-submit" 
                                                    value="Join"
                                                    id={room.roomId}
                                                    onClick={this.connectRoom}
                                                    disabled={room.status !== 'open'}
                                                >   
                                                </FormButton>
                                            }
                                        </td>
                                    </tr>   
                                )})}
                                </tbody>
                            </table>
                        </div>
                        <div className="lobby-management-container">
                            <div className="room-name-input-container" onKeyPress={this.handleKeyPress}>
                                <InputField
                                    type="text"
                                    id="roomName"
                                    name="roomName"
                                    placeholder="New room name"
                                    errorMessage={this.state.newRoomError}
                                    onChange={this.handleNewRoomNameChange}
                                    onClick={this.clearErrorMessage}
                                ></InputField>
                            </div>
                            <div className="create-room-button-container">
                                <FormButton
                                     type="Submit" 
                                     value="Create new room"
                                     onClick={this.createNewRoom}
                                     disabled={this.state.newRoomName==='' || this.state.newRoomError !== ''}
                                >
                                </FormButton>
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
            </div>
            
        )
    }

}
