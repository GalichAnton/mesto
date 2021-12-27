import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit, setInputValues }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._setInputValues = setInputValues;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
  }

  open() {
    super.open();
    this._setInputValues();
    this._setDefaultErrorState();
  }

  _setDefaultErrorState() {
    this._inputList.forEach((inputElement) => {
      if (inputElement.matches('.popup__input_type_error')) {
        const errorElement = this._formElement.querySelector(
          `#${inputElement.id}-error`
        );
        inputElement.classList.remove('popup__input_type_error');
        errorElement.classList.remove('popup__input-error_active');
        errorElement.textContent = '';
      }
    });
  }

  setEventListeners() {
    super.setEventListeners();
    const submitHandler = (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    };
    this._formElement.addEventListener('submit', submitHandler);
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((inputElement) =>
      (this._formValues[inputElement.name] = inputElement.value)
    );
    return this._formValues;
  }

  close() {
    super.close();
    this._formElement.reset()
  }
}
