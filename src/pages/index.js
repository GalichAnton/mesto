//Извините пропустил в первый раз 
import { Card } from "../scripts/Card.js"
import { FormValidator } from "../scripts/FormValidator.js"
import { initialCards, formsData, popCreateBtn, editProfileBtn, createFormElement,formElement,nameInput, aboutInput } from "../constants/data"
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import Section from '../scripts/Section.js';
import '../pages/index.css'

//Создаем экземпляра класса PopupWithImage
const popupWithImage = new PopupWithImage('#image-popup','.photo__img','.photo__caption');
popupWithImage.setEventListeners()

function initCard(item) {
  const card = new Card(item, {
    cardTemplateSelector: '#card',
    handleCardClick: (name,src) => {
      popupWithImage.open(name,src);
    },
  });
  return card.createCard();
} 
//Создаем экземпляр класса Section для карточек
const cardList = new Section(
  {
    data: initialCards,
    renderer: (cardItem) => {
      const cardElement = initCard(cardItem)
      cardList.addItem(cardElement, 'append');
    },
  },
  '.cards'
);
//Отрисоваем карточки
cardList.renderItems();

//Создаем экземпляр класса UserInfo
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__about',
});

//Создаем экземпляр класса PopupWithForm для userPopup
const popupWithUserForm = new PopupWithForm('#user-popup', {
  handleFormSubmit: (userData) => {
    userInfo.setUserInfo(userData);
    popupWithUserForm.close();
  },
  setInputValues: () => {
    const {name, about} = userInfo.getUserInfo()
    nameInput.value = name
    aboutInput.value = about
  },
});
popupWithUserForm.setEventListeners()
//Открываем userPopup
editProfileBtn.addEventListener('click', () => {
  popupWithUserForm.open();
  validateUserForm.resetValidationErrors() 
  validateUserForm.setButtonState(true)
});


//Создаем экземпляр класса PopupWithForm для photoPopup
const popupCreateCardForm = new PopupWithForm('#create-popup', {
  handleFormSubmit: (photoData) => {
    const newCardElement = initCard(photoData)
    cardList.addItem(newCardElement, 'prepend');
    popupCreateCardForm.close();
  },
  setInputValues: () => {
    
  },
});
popupCreateCardForm.setEventListeners()
//Открываем photoPopup
popCreateBtn.addEventListener('click', () => {
  popupCreateCardForm.open();
  validateCreateForm.resetValidationErrors() 
  validateCreateForm.setButtonState(false)
});

//Создаем экземпляр класса FormValidator для каждой формы и включить валидацию
const validateUserForm = new FormValidator(formsData, formElement)
validateUserForm.enableValidation()
const validateCreateForm = new FormValidator(formsData, createFormElement)
validateCreateForm.enableValidation()
