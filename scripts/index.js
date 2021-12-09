import { Card } from "./Card.js"
import { FormValidator } from "./FormValidator.js"
import { initialCards } from "./data.js"
const popUps = document.querySelectorAll('.popup')
const userPopUp = document.getElementById('user-popup')
const popBtn = document.querySelector('.profile__edit')
const closeBtn = document.querySelectorAll('.popup__close')
// Находим форму в DOM
const formElement = document.querySelector('#user-form')
const nameInput = formElement.querySelector('#name')
const aboutInput = formElement.querySelector('#about')
const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__about')
//Открытие попапа создание карточки
const createFormElement = document.querySelector('#create-form')
const placeNameInput = createFormElement.querySelector('#placeName')
const srcInput = createFormElement.querySelector('#src')
const popupAddCard = document.getElementById('create-popup')
const popCreateBtn = document.querySelector('.profile__add')
const cardsContainer = document.querySelector('.cards')
//Попап изображения
const photoPopup = document.querySelector('#image-popup')





const openPopup = (popup) => {
  popup.classList.remove('popup_closed')
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEsc)
}

const closePopup = (popup) => {
  popup.classList.add('popup_closed')
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEsc)
}

closeBtn.forEach(i => {
  i.addEventListener('click', (e) => {
    closePopup(e.target.parentNode.parentNode)
  })
})


function handleFormSubmit(evt) {
  evt.preventDefault()
  // Получите значение полей из свойства value
  const name = nameInput.value
  const about = aboutInput.value
  // Вставьте новые значения с помощью textContent
  profileName.textContent = name
  profileAbout.textContent = about
  closePopup(userPopUp)
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit)
popBtn.addEventListener('click', () => {
  openPopup(userPopUp)
  nameInput.value = profileName.textContent
  aboutInput.value = profileAbout.textContent
  validateUserForm.buttonToggleDisable(true)
})

//Sprint #5
//Инициализация карточек


function cardAppend(card, method) {
  if (method === 'append') {
    cardsContainer.append(card)
  } else if (method === 'prepend') {
    cardsContainer.prepend(card)
  }
}

const createNewCard = (data) => {
  const card = new Card(data, '#card', openPopup, photoPopup)
  return card.createCard()
}

initialCards.forEach(item => {
  const newCard = createNewCard(item)
  cardAppend(newCard, 'append')
})

//Добавление карточки
popCreateBtn.addEventListener('click', () => {
  openPopup(popupAddCard)
})

function addNewCard(e) {
  e.preventDefault()
  const data = { name: placeNameInput.value, link: srcInput.value }
  const newCard = createNewCard(data)
  cardAppend(newCard, 'prepend')
  closePopup(popupAddCard)
  placeNameInput.value = ''
  srcInput.value = ''
  validateCreateForm.buttonToggleDisable(false)
}
createFormElement.addEventListener('submit', addNewCard)


//Sprint #6
//Закрытие попапов по Esc
function closeByEsc(e) {
  const openPopup = document.querySelector('.popup_opened')
  if (e.key === 'Escape') {
    closePopup(openPopup)
  }
}
//Закрытие попапов по нажатию на оверлей
popUps.forEach((popup) => {
  popup.addEventListener('mousedown', (e) => {
    if (e.target === popup) {
      closePopup(e.target)
    }
  })
})


const data = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}

const validateUserForm = new FormValidator(data, formElement)
validateUserForm.enableValidation()
const validateCreateForm = new FormValidator(data, createFormElement)
validateCreateForm.enableValidation()