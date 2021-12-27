import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, photoSelector, captionSelector) {
    super(popupSelector)
    this._imgPopup = this._popup.querySelector(photoSelector)
    this._imgPopupCaption = this._popup.querySelector(captionSelector);
  }

  open(name,src) {
    super.open();
    this._imgPopup.src = src;
    this._imgPopup.alt = name;
    this._imgPopupCaption.textContent = name;
  }
}