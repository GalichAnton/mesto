export class FormValidator {
  constructor(data, formElement) {
    this._formElement = formElement
    this._inputSelector = data.inputSelector
    this._submitButtonSelector = data.submitButtonSelector
    this._inactiveButtonClass = data.inactiveButtonClass
    this._inputErrorClass = data.inputErrorClass
    this._errorClass = data.errorClass
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
  _findInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  //Установим состояние кнопки
  _setButtonState(buttonElement, invalidInput) {
    if (invalidInput) {
      buttonElement.setAttribute('disabled', true)
      buttonElement.classList.add(this._inactiveButtonClass)
    } else {
      buttonElement.disabled = false
      buttonElement.classList.remove(this._inactiveButtonClass)
    }
  }

  //Переключим состояние кнопки
  _toggleButtonState(inputList, buttonElement) {
    this._setButtonState(buttonElement, this._findInvalidInput(inputList))
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
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    )
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    )
    this._toggleButtonState(inputList, buttonElement)
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState(inputList, buttonElement)
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


