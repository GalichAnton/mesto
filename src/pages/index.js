import { Card } from "../scripts/Card.js"
import { FormValidator } from "../scripts/FormValidator.js"
import {
  formsData,
  popCreateBtn,
  editProfileBtn,
  createFormElement,
  formElement,
  nameInput,
  aboutInput,
  avatarForm,
  editAvatarBtn,
  apiOptions
} from "../constants/data"
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import popupDeleteCard from '../scripts/PopupDeleteCard.js'
import UserInfo from '../scripts/UserInfo.js';
import Section from '../scripts/Section.js';
import {Api} from '../scripts/Api.js'
import '../pages/index.css'

//Создаем экземпляра класса PopupWithImage
const popupWithImage = new PopupWithImage('#image-popup', '.photo__img', '.photo__caption');
popupWithImage.setEventListeners()

//Создаем экземпляр класса Api
export const api = new Api(apiOptions);

//Создаем экземпляр класса Section для карточек
const cardList = new Section(
  {
    renderer: (cardItem) => {
      const card = new Card(cardItem, api, {
        cardTemplateSelector: '#card',
        handleCardClick: (name,src) => {
          popupWithImage.open(name,src);
        },
        handleConfirmDelete: () => {
          const confirmPopup = new popupDeleteCard(
            '#delete-popup',
            api.deletePhoto(cardItem._id),
            cardItem
          );
          confirmPopup.setEventListeners()
          confirmPopup.open();
        },
      });
      api.getUserInfo()
        .then((data) => {
          const cardElement = card.createCard(data);
          cardList.addItem(cardElement,'append');
        })
        .catch((err) => console.log(`Что-то пошло не так: ${err}`))
    },
  },
  '.cards'
);
//Отрисоваем карточки
cardList.renderItems(api.getInitialCards());


//Создаем экземпляр класса UserInfo
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__about',
  userAvatarSelector: '.profile__avatar'
});


api.getUserInfo().then((data) => {
  userInfo.setUserInfo(data);
})
  .catch((err) => console.log(`Что-то пошло не так: ${err}`));

//Создаем экземпляр класса PopupWithForm для userPopup
const popupWithUserForm = new PopupWithForm('#user-popup', {
  handleFormSubmit: () => {
    const inputValues = popupWithUserForm.getInputValues();
    popupWithUserForm.renderLoading(true);
    api.updateUserInfo(inputValues)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`))
      .finally(() => {
        popupWithUserForm.renderLoading(false);
        popupWithUserForm.close();
      });
  },
  setInputValues: () => {
    const { name, about } = userInfo.getUserInfo()
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


//Создаем экземпляр класса PopupWithForm для createPopup
const popupCreateCardForm = new PopupWithForm('#create-popup', {
  handleFormSubmit: () => {
    popupCreateCardForm.renderLoading(true);
    const inputValues = popupCreateCardForm.getInputValues();
    api.addNewCard(inputValues)
      .then((data) => {
        const newCard = new Card(data, api, {
          cardTemplateSelector: '#card',
          handleCardClick: (name,src) => {
            popupWithImage.open(name,src);
          },
          handleConfirmDelete: () => {
            const confirmPopup = new popupDeleteCard(
              '#delete-popup',
              api.deletePhoto(data._id),
              data
            );
            confirmPopup.setEventListeners()
            confirmPopup.open();
          },
        });
        api.getUserInfo()
          .then((data) => {
            const newCardElement = newCard.createCard(data);
            cardList.addItem(newCardElement,'append');
          })
          .catch((err) => console.log(`Что-то пошло не так: ${err}`))
      })
      .finally(() => {
        popupCreateCardForm.renderLoading(false);
        popupCreateCardForm.close();
      });
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


//Создаем экземпляр класса PopupWithForm для avatarPopup
const popupWithAvatarForm = new PopupWithForm(
  '#avatar-popup',
  {
    handleFormSubmit: () => {
      popupWithAvatarForm.renderLoading(true);
      const inputValues = popupWithAvatarForm.getInputValues();
      api.updateUserAvatar(inputValues)
        .then((data) => {
          userInfo.setUserAvatar(data);
        })
        .catch((err) => console.log(`Что-то пошло не так: ${err}`))
        .finally(() => {
          popupWithAvatarForm.renderLoading(false);
          popupWithAvatarForm.close();
        });
    },
    setInputValues: () => {
      avatarForm.elements.url.value = '';
    },
  }
);
popupWithAvatarForm.setEventListeners()

editAvatarBtn.addEventListener('click', () => {
  popupWithAvatarForm.open();
  validateAvatarForm.resetValidationErrors()
  validateAvatarForm.setButtonState(false)
});

//Создаем экземпляр класса FormValidator для каждой формы и включить валидацию
const validateUserForm = new FormValidator(formsData, formElement)
validateUserForm.enableValidation()
const validateCreateForm = new FormValidator(formsData, createFormElement)
validateCreateForm.enableValidation()
const validateAvatarForm = new FormValidator(formsData, avatarForm);
validateAvatarForm.enableValidation()