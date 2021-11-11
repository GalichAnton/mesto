const userPopUp = document.getElementById("user-popup")
const popBtn = document.querySelector(".profile__edit")
const closeBtn = document.querySelectorAll(".popup__close")
// Находим форму в DOM
let formElement = document.querySelector(".popup__form")
let nameInput = formElement.querySelector("#name")
let aboutInput = formElement.querySelector("#about")
let profileName = document.querySelector(".profile__name")
let profileAbout = document.querySelector(".profile__about")

const openUserPopup = () => {
  userPopUp.classList.remove("popup_closed")
  userPopUp.classList.add("popup_opened")
  nameInput.value = profileName.textContent
  aboutInput.value = profileAbout.textContent
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  // Получите значение полей из свойства value
  let name = nameInput.value
  let about = aboutInput.value
  // Вставьте новые значения с помощью textContent
  profileName.textContent = name
  profileAbout.textContent = about
  closePopup()
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
popBtn.addEventListener("click", openUserPopup)


//Sprint #4
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
];

const cardsContainer = document.querySelector('.cards')

initialCards.forEach(item => {
  let card = '';
  card = `
  <li class="card">
    <button type="button" class="card__delete"></button>
    <div class="card__container">
      <img src="${item.link}" class="card__photo" alt="${item.name}">
    </div>
    <div class="card__descr">
      <h2 class="card__caption">${item.name} </h2>
      <button aria-label="Понравилось" type="button" class="card__like"></button>
    </div>
  </li>`
  cardsContainer.insertAdjacentHTML('afterbegin', card)
})


//Открытие попапа создание карточки
let createFormElement = document.querySelector("#create-form")
let placeNameInput = createFormElement.querySelector("#placeName")
let srcInput = createFormElement.querySelector("#src")
const createPopUp = document.getElementById("create-popup")
const popCreateBtn = document.querySelector(".profile__add")

const openCreatePopup = () => {
  createPopUp.classList.remove("popup_closed")
  createPopUp.classList.add("popup_opened")
}
popCreateBtn.addEventListener("click", openCreatePopup)


//Добавление карточки

function createFormSubmitHandler(e) {
  e.preventDefault();
  // Получите значение полей из свойства value
  let name = placeNameInput.value
  let src = srcInput.value
  const cardTemplate = document.querySelector('#card').content
  const cardsContainer = document.querySelector('.cards')

  const cardsElem = cardTemplate.querySelector('.card').cloneNode(true)
  cardsElem.querySelector('.card__photo').src = src
  cardsElem.querySelector('.card__photo').alt = name
  cardsElem.querySelector('.card__caption').textContent = name

  cardsContainer.prepend(cardsElem)
  closePopup()
}
createFormElement.addEventListener('submit', createFormSubmitHandler);

//Лайк карточки
const btnsLike = document.querySelectorAll('.card__like')

const toggleLike = (btn) => {
  btn.classList.toggle('card__like_liked')
}

//Удаление карточки
const deleteBtns = document.querySelectorAll('.card__delete')

const deleteCard = (btn) => {
  btn.parentNode.remove()
}

//Попап изображения
const photoPopup = document.querySelector('#image-popup')

const openImgPopup = (img) => {
  const imgContainer = document.querySelector('.photo__img')
  const imgCaption = document.querySelector('.photo__caption')
  imgContainer.setAttribute('src', img.getAttribute('src'))
  imgCaption.textContent = img.getAttribute('alt')
  photoPopup.classList.add('popup_opened')
  photoPopup.classList.remove('popup_closed')
}

//Добавление слушателя на блок карточек
document.querySelector('.cards').addEventListener('click', (e) => {
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

const closePopup = () => {
  userPopUp.classList.add("popup_closed")
  userPopUp.classList.remove("popup_opened")
  createPopUp.classList.remove("popup_opened")
  createPopUp.classList.add("popup_closed")
  photoPopup.classList.add('popup_closed')
  photoPopup.classList.remove('popup_opened')
  placeNameInput.value = ''
  srcInput.value = ''
  nameInput.value = ""
  aboutInput.value = ""
}


closeBtn.forEach(i => {
  i.addEventListener("click", () => {
    closePopup()
  })
})

