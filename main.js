const popUp = document.getElementById("user-popup")
const popBtn = document.querySelector(".profile__button_edit")
const closeBtn = document.querySelector(".popup__button_close")
// Находим форму в DOM
let formElement = document.querySelector(".popup__container")
let nameInput = formElement.querySelector("#name") 
let aboutInput = formElement.querySelector("#about")
let profileName = document.querySelector(".profile__name")
let profileAbout = document.querySelector(".profile__about")

const openPopup = () => {
  document.body.style.overflow ="hidden"
  popUp.classList.add("popup_opened","fadeIn")
  nameInput.placeholder = profileName.textContent
  aboutInput.placeholder = profileAbout.textContent
}

const closePopup = () => {
  document.body.style.overflow =""
  popUp.classList.remove("popup_opened","fadeIn")
  nameInput.value = ""
  aboutInput.value = ""
}

const addOpenListener = () => {
  popBtn.addEventListener("click", openPopup)
  
}

const addCloseBtnListener = () => {
  closeBtn.addEventListener("click", closePopup)
}

const addCloseListener = () => {
  popUp.addEventListener("click", (e) => {
        if (e.target == popUp) {
      closePopup()
    }
  })
}
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
	evt.preventDefault(); 
// Получите значение полей из свойства value
	let name = nameInput.value
  let about = aboutInput.value
	// Выберите элементы, куда должны быть вставлены значения полей
  let profileName = document.querySelector(".profile__name")
  let profileAbout = document.querySelector(".profile__about")

	// Вставьте новые значения с помощью textContent
  profileName.textContent = name
  profileAbout.textContent = about
  closePopup()
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
addOpenListener();
addCloseBtnListener();
addCloseListener();
