import { Manager } from 'socket.io-client';

const socketHost = 'http://127.0.0.1'
const socketPort = '5002'

const manager = new Manager(socketHost + ':' + socketPort)

const lobbySocket = manager.socket("/lobby");
const roomSocket = manager.socket("/room");
const gameSocket = manager.socket("/game");

export { lobbySocket, roomSocket, gameSocket }