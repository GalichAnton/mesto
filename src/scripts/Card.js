export class Card {
  constructor(data, { cardTemplateSelector, handleCardClick }) {
    this._cardSelector = cardTemplateSelector
    this._handleCardClick = handleCardClick;
    this._name = data.name
    this._src = data.link

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
  createCard() {
    this._cardItem = this._getCardTemplate();
    this._setEventListeners();
    const cardPhoto = this._cardItem.querySelector('.card__photo');
    cardPhoto.src = this._src;
    cardPhoto.alt = this._name;
    this._cardItem.querySelector('.card__caption').textContent = this._name;
    return this._cardItem;
  }

  //Установим слушатели событий
  _setEventListeners() {
    this._cardItem
      .querySelector('.card__like')
      .addEventListener('click', () => {
        this._handleCardLike();
      });
    this._cardItem
      .querySelector('.card__delete')
      .addEventListener('click', () => {
        this._handleCardDelete();
      });
    this._cardItem
      .querySelector('.card__photo')
      .addEventListener('click', (e) => {
        this._handleCardClick(e);
      });
  }

  //Лайк
  _handleCardLike() {
    this._cardItem
      .querySelector('.card__like')
      .classList.toggle('card__like_liked');
  }

  //Удаление
  _handleCardDelete() {
    this._cardItem.remove();
  }

}