import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit, setInputValues }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._setInputValues = setInputValues;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
    this._buttonSubmit = this._formElement.querySelector('.popup__submit');
    this._buttonText = this._buttonSubmit.textContent;
  }

  open() {
    super.open();
    this._setInputValues();
  }

  setEventListeners() {
    super.setEventListeners();
    const submitHandler = (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    };
    this._formElement.addEventListener('submit', submitHandler);
  }

  getInputValues() {
    this._formValues = {};
    this._inputList.forEach((inputElement) =>
      (this._formValues[inputElement.name] = inputElement.value)
    );
    return this._formValues;
  }

  //Отобразить состояние загрузки
  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.classList.add('popup__submit_loading');
      this._buttonSubmit.textContent = `Сохранение...`;
    } else {
      this._buttonSubmit.classList.remove('popup__submit_loading');
      this._buttonSubmit.textContent = this._buttonText;
    }
  }

  close() {
    super.close();
    this._formElement.reset()
  }
}
