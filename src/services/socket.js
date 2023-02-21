import io from 'socket.io-client';

const socketHost = 'http://127.0.0.1'
const socketPort = '5002'

const lobbySocket = io(socketHost + ':' + socketPort + "/lobby");
const roomSocket = io(socketHost + ':' + socketPort + "/room");

export { lobbySocket, roomSocket }