export class Card {
  constructor(data, api, userId, { cardTemplateSelector, handleCardClick, handleConfirmDelete }) {
    this._api = api
    this._cardSelector = cardTemplateSelector
    this._handleCardClick = handleCardClick;
    this._owner = data.owner
    this._likes = data.likes
    this._confirmDelete = handleConfirmDelete
    this._id= data._id
    this._name = data.name
    this._src = data.link
    this._userId = userId
  }

  //Добавляем разметку карточки
  _getCardTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  //Создадим карточку
  createCard(data) {
    this._cardItem = this._getCardTemplate();
    this._setEventListeners();
    this._cardItem.id = this._id;
    const cardPhoto = this._cardItem.querySelector('.card__photo');
    cardPhoto.src = this._src;
    cardPhoto.alt = this._name;
    this._cardItem.querySelector('.card__caption').textContent = this._name;

    this._cardItem.querySelector(
      '.card__counter'
    ).textContent = `${this._likes.length}`;

    if(this._userId === this._owner._id) {
      this._cardItem.querySelector('.card__delete').style.display = 'block'
    }
    
    if(this._likes.find((like) => like._id === data._id)) {
      this._cardItem.querySelector('.card__like').classList.add('card__like_liked')
    }

    return this._cardItem;
  }
  //Установим слушатели событий
  _setEventListeners() {
    this._cardItem
      .querySelector('.card__like')
      .addEventListener('click', () => {
        this._handleCardLike();
      });
    if (this._cardItem.querySelector('.card__delete')) {
      this._cardItem
        .querySelector('.card__delete')
        .addEventListener('click', () => {
          this._confirmDelete();
        });
    }

    this._cardItem
      .querySelector('.card__photo')
      .addEventListener('click', () => {
        this._handleCardClick(this._name, this._src);
      });
  }

  //Лайк
  _handleCardLike() {
    const likeButton = this._cardItem.querySelector('.card__like');
    const counter = this._cardItem.querySelector('.card__counter');

    if (!likeButton.classList.contains('card__like_liked')) {
      this._api
        .likeCard(this._id)
        .then((data) => {
          likeButton.classList.add('card__like_liked');
          counter.textContent = `${data.likes.length}`;
        })
        .catch((err) => console.log(`Что-то пошло не так: ${err}`));
    } else {
      this._api
        .dislikeCard(this._id)
        .then((data) => {
          likeButton.classList.remove('card__like_liked');
          counter.textContent = `${data.likes.length}`;
        })
        .catch((err) => console.log(`Что-то пошло не так: ${err}`));
    }
  }

  //Удаление
  _handleCardDelete() {
    this._cardItem.remove();
  }

}