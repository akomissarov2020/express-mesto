class Api {

    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = {
        authorization: options.headers.authorization,
        'Content-Type': options.headers['Content-Type']
      };
    }

    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'GET',
        headers: this._headers
      })
      .then(this._checkResponse);
    }

    getUserInfo() {
      return fetch(`${this._baseUrl}users/me`, {
        method: 'GET',
        headers: this._headers
      })
      .then(this._checkResponse);
    }

    updateUserInfo(data) {
      return fetch(`${this._baseUrl}users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then(this._checkResponse);
    }

    insertNewCard(data) {
      return fetch(`${this._baseUrl}cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(this._checkResponse);
    }

    putLike(id) {
      return fetch(`${this._baseUrl}cards/likes/${id}`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(this._checkResponse);
    }

    deleteLike(id) {
      return fetch(`${this._baseUrl}cards/likes/${id}`, {
        method: 'DELETE',
        headers: this._headers
        })
      .then(this._checkResponse);
    }

    updateAvatar(data) {
      return fetch(`${this._baseUrl}users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
      .then(this._checkResponse);
    }

    deletePhoto(id) {
      return fetch(`${this._baseUrl}cards/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }

    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  const api = new Api({
    baseUrl: 'http://mesto2002.nomoredomains.work/api',
    headers: {
      authorization: '05e586ce-c0c8-4f14-bbd3-b259a470e2b4',
      'Content-Type': 'application/json'
    }
  });

  export default api;