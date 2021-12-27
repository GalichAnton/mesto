export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector }) {
    this._userNameSelector = userNameSelector;
    this._userAboutSelector = userAboutSelector;
    this._userName = document.querySelector(this._userNameSelector);
    this._userAbout = document.querySelector(this._userAboutSelector);
    
  }

  getUserInfo() {
    this._userData = {};
    this._userData.name = this._userName.textContent;
    this._userData.about = this._userAbout.textContent;
    
    return this._userData;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userAbout.textContent = data.about;
    console.log(this._userName.textContent)
    console.log(this._userAbout.textContent)
  }
}