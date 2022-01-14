export const formsData = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}

export const cardsContainer = document.querySelector('.cards')
export const popCreateBtn = document.querySelector('.profile__add')
export const editProfileBtn = document.querySelector('.profile__edit')
export const editAvatarBtn = document.querySelector('.profile__avatar-change')
export const createFormElement = document.querySelector('#create-form')
export const formElement = document.querySelector('#user-form')
export const nameInput = formElement.querySelector('#name')
export const aboutInput = formElement.querySelector('#about')
export const avatarForm = document.querySelector('#avatar-form')
export const apiOptions = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34/',
  headers: {
    'authorization': 'bafafc62-4fb6-453f-87fa-68e5b80e5c31',
    'Content-Type': 'application/json'
  }
}