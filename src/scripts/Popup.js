export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
  }

  open() {
    this._popup.classList.remove('popup_closed');
    this._popup.classList.add('popup_opened');
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.classList.add('popup_closed'); 
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  _setEventListeners() {
    this._popup.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup__close') || e.target.classList.contains('popup')) {
        this.close();
      }
    });
    document.addEventListener('keyup', (e) => {
      this._handleEscClose(e);
    });
  }
}