import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(e) {
    super.open();
    const imgPopup = this._popup.querySelector('.photo__img');
    const imgPopupCaption = this._popup.querySelector('.photo__caption');
    const bigImg = e.target;
    imgPopup.src = bigImg.src;
    imgPopup.alt = bigImg.alt;
    imgPopupCaption.textContent = bigImg.alt;
  }
}