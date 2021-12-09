import { Card } from "./Card.js"
import { FormValidator } from "./FormValidator.js"
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
const imgContainer = document.querySelector('.photo__img')
const imgCaption = document.querySelector('.photo__caption')




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
  formElement.querySelector('.popup__submit').classList.remove('popup__submit_disabled')
  formElement.querySelector('.popup__submit').removeAttribute('disabled')
})

//Sprint #5
//Инициализация карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]

function cardAppend(card, method) {
  if (method === 'append') {
    cardsContainer.append(card)
  } else if (method === 'prepend') {
    cardsContainer.prepend(card)
  }
}

//Открытие попапа с картинкой
const openImgPopup = (img) => {
  imgContainer.setAttribute('src', img.getAttribute('src'))
  imgCaption.textContent = img.getAttribute('alt')
  openPopup(photoPopup)
}

initialCards.forEach(item => {
  const card = new Card(item, '#card', openImgPopup)
  const newCard = card.createCard()
  cardAppend(newCard, 'append')
})

//Добавление карточки
popCreateBtn.addEventListener('click', () => {
  openPopup(popupAddCard)
})

function addNewCard(e) {
  e.preventDefault()
  const data = {name:placeNameInput.value, link:srcInput.value}
  const card = new Card(data,'#card',openImgPopup).createCard()
  cardAppend(card, 'prepend')
  closePopup(popupAddCard)
  placeNameInput.value = ''
  srcInput.value = ''
  createFormElement.querySelector('.popup__submit').classList.add('popup__submit_disabled')
  createFormElement.querySelector('.popup__submit').setAttribute('disabled', true)
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
  errorClass: 'popup__input-error_active'
}

const validateUserForm = new FormValidator(data,formElement)
validateUserForm.enableValidation()
const validateCreateForm = new FormValidator(data,createFormElement)
validateCreateForm.enableValidation()