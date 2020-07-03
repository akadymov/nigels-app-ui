import React from 'react';

import './lobby.css'
import Cookies from 'universal-cookie';
import NaegelsApi from '../../services/naegels-api-service';

import InputField from '../input-field';
import FormButton from '../form-button';
import ActiveFrame from '../active-frame';
import ConfirmationPopup from '../confirmation-popup/confirmation-popup';

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
                    r.created = r.created // TODO: format timestamp (firstly, convert all dates to numbers in server responses)
                    r.id = r.roomId
                    newRooms.push(r)
                });
                this.setState({rooms: newRooms})
                console.log(newRooms)
            }
        });
    };

    connectRoom = (e) => {
        const roomId = e.target.id
        this.NaegelsApi.connectRoom(this.Cookies.get('idToken'), roomId)
        .then((body) => {
            if(!body.errors){
                window.location.replace('/lobby/room/' + roomId)
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

    createNewRoom = () => {
        this.NaegelsApi.createRoom(this.Cookies.get('idToken'), this.state.newRoomName)
        .then((body) => {
            if(body.errors) {
                this.handleCreateRoomError(body)
            } else {
                window.location.replace('/lobby/room/' + body.roomId)
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
                                        <td className="lobby-table-cell">{room.roomName}</td>
                                        <td className="lobby-table-cell">{room.host}</td>
                                        <td className="lobby-table-cell">{room.created}</td>
                                        <td className="lobby-table-cell">{room.connectedUsers} / 10</td>
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
                            <div className="room-name-input-container">
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
