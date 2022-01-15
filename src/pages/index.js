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
import PopupDeleteCard from '../scripts/PopupDeleteCard.js'
import UserInfo from '../scripts/UserInfo.js';
import Section from '../scripts/Section.js';
import {Api} from '../scripts/Api.js'
import '../pages/index.css'

//Создаем экземпляра класса PopupWithImage
const popupWithImage = new PopupWithImage('#image-popup', '.photo__img', '.photo__caption');
popupWithImage.setEventListeners()
const confirmPopup = new PopupDeleteCard('#delete-popup');
confirmPopup.setEventListeners()

//Создаем экземпляр класса FormValidator для каждой формы и включить валидацию
const validateUserForm = new FormValidator(formsData, formElement)
validateUserForm.enableValidation()
const validateCreateForm = new FormValidator(formsData, createFormElement)
validateCreateForm.enableValidation()
const validateAvatarForm = new FormValidator(formsData, avatarForm);
validateAvatarForm.enableValidation()
//Создаем экземпляр класса Api
const api = new Api(apiOptions);

//Создаем экземпляр класса UserInfo
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__about',
  userAvatarSelector: '.profile__avatar'
});


const generateCard = (data) => {
  const newCard = new Card(
    data,
    api,
    userInfo._id,
    {
      cardTemplateSelector: '#card',
      handleCardClick: (name,src) => {
        popupWithImage.open(name,src);
      },
      handleConfirmDelete: () => {
        confirmPopup.open();
        confirmPopup.onClickSubmit(() => {
          api
            .deleteCard(newCard._id)
            .then(() => {
              newCard._handleCardDelete();
              confirmPopup.close();
            })
            .catch((error) => console.log(`Ошибка ${error}`));
        });
      },
    }
  );

  return newCard.createCard(data);
};


//Создаем экземпляр класса Section для карточек
const cardList = new Section(
  {
    renderer: (cardItem) => {
      cardList.addItem(generateCard(cardItem),'append')
    },
  },
  '.cards'
);
//Отрисоваем карточки
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    cardList.renderItems(initialCards);
  })
  .catch(() => {
    (error) => console.log(error);
  });


//Создаем экземпляр класса PopupWithForm для userPopup
const popupWithUserForm = new PopupWithForm('#user-popup', 
{
  handleFormSubmit: () => {
    const inputValues = popupWithUserForm.getInputValues();
    popupWithUserForm.renderLoading(true);
    api.updateUserInfo(inputValues)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupWithUserForm.close();
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`))
      .finally(() => {
        popupWithUserForm.renderLoading(false);
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
        cardList.addItem(generateCard(data),'prepend')
        popupCreateCardForm.close();
      })
      .catch((err) => console.log(`Что-то пошло не так при создании карточки: ${err}`))
      .finally(() => {
        popupCreateCardForm.renderLoading(false);
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
          popupWithAvatarForm.close();
        })
        .catch((err) => console.log(`Что-то пошло не так при обновлении аватара: ${err}`))
        .finally(() => {
          popupWithAvatarForm.renderLoading(false);
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

