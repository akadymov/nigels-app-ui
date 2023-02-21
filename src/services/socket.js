import io from 'socket.io-client';
const lobbySocket = io("http://localhost:5002/lobby");
const roomSocket = io("http://localhost:5002/room");

export { lobbySocket, roomSocket }