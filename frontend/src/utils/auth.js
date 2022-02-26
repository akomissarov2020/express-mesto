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
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
          })
          .then(this._checkResponse);
    }

    logout() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
      })
      .then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res);
    }
}

const auth = new AuthApi({
    baseUrl: 'http://mesto2002.nomoredomains.work/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default auth;