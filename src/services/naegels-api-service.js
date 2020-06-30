export default class NaegelsApi {

    _apiHost = 'http://localhost'
    _apiPort = '9000'
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
        const res = await fetch(
            resourceLocation,
            {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            }
        );
        if(res.status >> 499) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        return await res.json();
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
    }

};

