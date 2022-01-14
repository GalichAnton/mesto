export class Api {
  constructor({baseUrl,headers}) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(res.status);
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, { 
      method: 'GET',
      headers: this._headers 
    })
      .then((res) => this._handleResponse(res))
      .catch((err) => console.log(`Ошибочка ${err}`));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, { 
      method: 'GET',
      headers: this._headers 
    })
      .then((res) => this._handleResponse(res))
      .catch((err) => console.log(`Ошибочка ${err}`))
  }

  updateUserInfo(newUserInfo) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newUserInfo.name,
        about: newUserInfo.about,
      }),
    })
      .then((res) => this._handleResponse(res))
      .catch((err) => console.log(`Всё сломалось, ищем ошибку: ${err}`));
  }

  updateUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar:avatar.url})
    })
    .then(res => this._handleResponse(res));
  } 

  addNewCard(newCard) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
      headers: this._headers,
    })
      .then((res) => this._handleResponse(res))
      .catch((err) => console.log(`Ничего не работает: ${err}`));
  }

  //Отобразить количество лайков
  likeCard(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(res => this._handleResponse(res));
  }

  dislikeCard(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._handleResponse(res));
  }

  deletePhoto(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._handleResponse(res));
  }

}

