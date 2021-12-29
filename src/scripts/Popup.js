export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popup.classList.remove('popup_closed');
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup',this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.classList.add('popup_closed');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup__close') || e.target.classList.contains('popup')) {
        this.close();
      }
    });
  }
}