const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid
  })
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(inactiveButtonClass)
    buttonElement.setAttribute('disabled', true)
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(inactiveButtonClass)
    buttonElement.removeAttribute('disabled')
  }
}

const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, inputErrorClass, errorClass)
  }
}

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  // Остальной код такой же
  inputElement.classList.add(inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(errorClass)
}

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  // Остальной код такой же
  inputElement.classList.remove(inputErrorClass)
  errorElement.classList.remove(errorClass)
  errorElement.textContent = ''
}

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(inputSelector))
  const buttonElement = formElement.querySelector(submitButtonSelector)
  toggleButtonState(inputList, buttonElement, inactiveButtonClass)
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, inputErrorClass, errorClass)
      toggleButtonState(inputList, buttonElement, inactiveButtonClass)
    })
  })
}
const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(formSelector))
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault()
    })
    // Для каждой формы вызовем функцию setEventListeners,
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass)
  })
}

// Вызовем функцию
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
})

