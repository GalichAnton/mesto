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
const btnsLike = document.querySelectorAll('.card__like')
const deleteBtns = document.querySelectorAll('.card__delete')


nameInput.value = profileName.textContent
aboutInput.value = profileAbout.textContent
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
  nameInput.value = ''
  aboutInput.value = ''
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit)
popBtn.addEventListener('click', () => {
  openPopup(userPopUp)
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

function createCard(name, src) {
  const cardTemplate = document.querySelector('#card').content
  const cardsElem = cardTemplate.querySelector('.card').cloneNode(true)
  cardsElem.querySelector('.card__photo').src = src
  cardsElem.querySelector('.card__photo').alt = name
  cardsElem.querySelector('.card__caption').textContent = name
  cardsElem.addEventListener('click', (e) => {
    className = e.target.classList.item(0)
    switch (className) {
      case 'card__like':
        toggleLike(e.target)
        break
      case 'card__delete':
        deleteCard(e.target)
        break
      case 'card__photo':
        openImgPopup(e.target)
        break
    }
  })
  return cardsElem
}

function cardAppend(card, method) {
  if (method === 'append') {
    cardsContainer.append(card)
  } else if (method === 'prepend') {
    cardsContainer.prepend(card)
  }
}

initialCards.forEach(item => {
  const card = createCard(item.name, item.link)
  cardAppend(card, 'append')
})

//Добавление карточки
popCreateBtn.addEventListener('click', () => {
  openPopup(popupAddCard)
})

function addNewCard(e) {
  e.preventDefault()
  // Получите значение полей из свойства value
  const name = placeNameInput.value
  const src = srcInput.value
  const card = createCard(name, src)
  cardAppend(card, 'prepend')
  closePopup(popupAddCard)
  placeNameInput.value = ''
  srcInput.value = ''
  createFormElement.querySelector('.popup__submit').classList.add('popup__submit_disabled')
  createFormElement.querySelector('.popup__submit').setAttribute('disabled', true)
}
createFormElement.addEventListener('submit', addNewCard)
//Лайк карточки
const toggleLike = (btn) => {
  btn.classList.toggle('card__like_liked')
}
//Удаление карточки
const deleteCard = (btn) => {
  btn.parentNode.remove()
}
//Открытие попапа с картинкой
const openImgPopup = (img) => {
  imgContainer.setAttribute('src', img.getAttribute('src'))
  imgCaption.textContent = img.getAttribute('alt')
  openPopup(photoPopup)
}

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