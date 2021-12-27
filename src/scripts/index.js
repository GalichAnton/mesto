import { Card } from "./Card.js"
import { FormValidator } from "./FormValidator.js"
import { initialCards, formsData, popCreateBtn, editProfileBtn, createFormElement,formElement } from "../constants/data"
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';
import '../pages/index.css'

//Создаем экземпляра класса PopupWithImage
const popupWithImage = new PopupWithImage('#image-popup');
//Создаем экземпляр класса Section для карточек
const cardList = new Section(
  {
    data: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem, {
        cardTemplateSelector: '#card',
        handleCardClick: (e) => {
          popupWithImage.open(e);
        },
      });
      const cardElement = card.createCard();
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
    const formElement = document.querySelector('#user-form');
    formElement.querySelector('#name').value = userInfo.getUserInfo().name;
    formElement.querySelector('#about').value = userInfo.getUserInfo().about;
  },
});

//Открываем userPopup
editProfileBtn.addEventListener('click', () => {
  popupWithUserForm.open();
  validateUserForm.buttonToggleDisable(true)
});


//Создаем экземпляр класса PopupWithForm для photoPopup
const popupCreateCardForm = new PopupWithForm('#create-popup', {
  handleFormSubmit: (photoData) => {
    let newCard = new Card(photoData, {
      cardTemplateSelector: '#card',
      handleCardClick: (e) => {
        popupWithImage.open(e);
      },
    });
    let newCardElement = newCard.createCard();
    cardList.addItem(newCardElement, 'prepend');
    popupCreateCardForm.close();
  },
  setInputValues: () => {
    const formElement = document.querySelector('#create-form');
    formElement.elements.name.value = '';
    formElement.elements.link.value = '';
  },
});

//Открываем photoPopup
popCreateBtn.addEventListener('click', () => {
  popupCreateCardForm.open();
  validateCreateForm.buttonToggleDisable(false)
});

//Создаем экземпляр класса FormValidator для каждой формы и включить валидацию
const validateUserForm = new FormValidator(formsData, formElement)
validateUserForm.enableValidation()
const validateCreateForm = new FormValidator(formsData, createFormElement)
validateCreateForm.enableValidation()
