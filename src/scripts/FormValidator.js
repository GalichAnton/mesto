export class FormValidator {
  constructor(data, formElement) {
    this._formElement = formElement
    this._inputSelector = data.inputSelector
    this._submitButtonSelector = data.submitButtonSelector
    this._inactiveButtonClass = data.inactiveButtonClass
    this._inputErrorClass = data.inputErrorClass
    this._errorClass = data.errorClass
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector)
  }

  //Определяем элемент с текстом ошибки
  _returnErrorElement(inputElement) {
    return this._formElement.querySelector(`#${inputElement.id}-error`)
  }

  //Показаваем ошибку в поле ввода
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._returnErrorElement(inputElement)
    inputElement.classList.add(this._inputErrorClass)
    errorElement.classList.add(this._errorClass)
    errorElement.textContent = errorMessage
  }

  //Спрятать ошибку в поле ввода
  _hideInputError(inputElement) {
    const errorElement = this._returnErrorElement(inputElement)
    inputElement.classList.remove(this._inputErrorClass)
    errorElement.classList.remove(this._errorClass)
    errorElement.textContent = ''
  }

  //Найдем невалидное поле
  _findInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  //Установим состояние кнопки
  setButtonState() {
    if (this._findInvalidInput()) {
      this._buttonElement.setAttribute('disabled', true)
      this._buttonElement.classList.add(this._inactiveButtonClass)
    } else {
      this._buttonElement.disabled = false
      this._buttonElement.classList.remove(this._inactiveButtonClass)
    }
  }


  //Проверим валидность поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  //Повесим слушатели
  _setEventListeners() {
    this.setButtonState()
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this.setButtonState()
      })
    })
  }



  //Объявим функицю валидации
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    this._setEventListeners()
  }
}


