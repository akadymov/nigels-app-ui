export default class NaegelsApi {

    _apiHost = 'http://localhost'
    _apiPort = '5000'
    _apiContext = '/api/v1'

    status(response) {  
        if (response.status >= 200 && response.status < 500) {  
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))  
        }
    }

    json(response) {  
        return response.json()  
    }

    apiCall = async(url, method='GET', data = '') => {

        if (!['GET','DELETE','POST','PUT'].includes(method)) {
            throw new Error(`Bad request method (${method})`);
        }
        
        const resourceLocation = `${this._apiHost}:${this._apiPort}${this._apiContext}${url}`
        var req = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        if(data !== ''){
            req.body = JSON.stringify(data)
        }
        const res = await fetch(
            resourceLocation,
            req
        );
        if(res.status >> 499) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        return await res.json({});
    };

    registerUser = async (email, username, password, repeatPassword, preferredLang) => {
        const data = {
            email: email,
            username: username,
            password: password,
            repeatPassword: repeatPassword,
            preferredLang: preferredLang
        };
        const res = await this.apiCall('/user', 'POST', data);
        return res
    };

    login = async (username, password) => {
        const data = {
            username: username,
            password: password
        };
        const res = await this.apiCall('/user/token', 'POST', data);
        return res
    };

    getRooms = async (closed=false) => {
        const res = await this.apiCall('/room/all' + (closed ? '?closed=Y' : ''));
        return res
    };

    createRoom = async (token, roomName) => {
        const data = {
            token: token,
            roomName: roomName
        };
        const res = await this.apiCall('/room', 'POST', data);
        return res
    };

    connectRoom = async (token, roomId) => {
        const data = {
            token: token
        };
        const res = await this.apiCall('/room/' + roomId + '/connect', 'POST', data);
        return res
    };

    closeRoom = async (token, roomId) => {
        const data = {
            token: token
        };
        const res = await this.apiCall('/room/' + roomId + '/close', 'POST', data);
        return res
    };

    getRoom = async (roomId) => {
        const res = await this.apiCall('/room/' + roomId);
        return res
    };

    disconnectRoom = async (token, roomId, username) => {
        const data = {
            token: token,
            username: username
        };
        const res = await this.apiCall('/room/' + roomId + '/disconnect', 'POST', data);
        return res
    };

    confirmReady = async (token, roomId, username) => {
        const data = {
            token: token,
            username: username
        };
        const res = await this.apiCall('/room/' + roomId + '/ready', 'POST', data);
        return res
    };

    resetReady = async (token, roomId, username) => {
        const data = {
            token: token,
            username: username
        };
        const res = await this.apiCall('/room/' + roomId + '/ready/reset', 'POST', data);
        return res
    };

    startGame = async (token) => {
        const data = {
            token: token
        };
        const res = await this.apiCall('/game/start', 'POST', data);
        return res
    };

    getGame = async (gameId) => {
        const res = await this.apiCall('/game/' + gameId);
        return res
    };

    dealCards = async (gameId, token) => {
        const data = {
            token: token
        };
        const res = await this.apiCall('/game/' + gameId + '/hand/deal', 'POST', data);
        return res
    };

    definePositions = async (gameId, token) => {
        const data = {
            token: token
        };
        const res = await this.apiCall('/game/' + gameId + '/positions', 'POST', data);
        return res
    };

    getCards = async (token, gameId, handId, burned=false) => {
        const data = {
            token: token
        };
        const res = await this.apiCall('/game/' + gameId + '/hand/' + handId + '/cards?burned=' + (burned ? 'y' : 'n'), 'POST', data);
        return res
    };

    getHand = async (gameId, handId) => {
        const res = await this.apiCall('/game/' + gameId + '/hand/' + handId);
        return res
    };

    makeBet = async (token, gameId, handId, betSize) => {
        const data = {
            token: token,
            betSize: betSize
        };
        const res = await this.apiCall('/game/' + gameId + '/hand/' + handId + '/turn/bet', 'POST', data);
        return res
    };

};

