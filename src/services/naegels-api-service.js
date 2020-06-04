export default class NaegelsApi {

    _apiHost = 'https://localhost'
    _apiPort = '5000'
    _apiContext = '/api/v1'

    apiCall = async (url, method='GET', data = '') => {
        
        const resourceLocation = `${this._apiHost}` + `:` + `${this._apiPort}${this._apiContext}${url}`
        
        if (['POST','PUT'].includes(method)) {
            const res = await fetch(
                resourceLocation,
                {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            );
        } else if (['GET','DELETE'].includes(method)) {
            const res = await fetch(
                resourceLocation,
                {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        } else {
            throw new Error(`Bad request method (${method})`);
        }

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
        }
        return await res.json();
    };

    registerUser = async (username, email, password, repeatPassword, preferredLang=undefined, aboutMe=undefined) => {
        const data = {
            'username': username,
            'email': email,
            'password': password,
            'repeat-password': repeatPassword,
            'about-me': aboutMe,
            'preferred-lang': preferredLang
        }
        const res = await this.apiCall('/user', 'POST', data);
        return res.results
    };
};

