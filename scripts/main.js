const popUp = document.getElementById("user-popup")
const popBtn = document.querySelector(".profile__edit")
const closeBtn = document.querySelector(".popup__close")
// Находим форму в DOM
let formElement = document.querySelector(".popup__form")
let nameInput = formElement.querySelector("#name")
let aboutInput = formElement.querySelector("#about")
let profileName = document.querySelector(".profile__name")
let profileAbout = document.querySelector(".profile__about")

const openPopup = () => {
  popUp.classList.add("popup_opened")
  nameInput.value = profileName.textContent
  aboutInput.value = profileAbout.textContent
}

const closePopup = () => {
  popUp.classList.remove("popup_opened")
  nameInput.value = ""
  aboutInput.value = ""
}
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
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
popBtn.addEventListener("click", openPopup)
closeBtn.addEventListener("click", closePopup)