class AuthApi {

    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = {
        'Content-Type': options.headers['Content-Type']
      };
    }

    login(data) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
          })
        .then(this._checkResponse);
    }
  
    register(data) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
               email: data.email,
               password: data.password
            }) 
        })
        .then(this._checkResponse);
    }

    user() {
        const jwt = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${jwt}`,
            }
          })
          .then(this._checkResponse);
    }

    logout() {
        localStorage.removeItem("jwt");
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res);
    }
}

const auth = new AuthApi({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default auth;