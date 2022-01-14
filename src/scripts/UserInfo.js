export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
    this._userNameSelector = userNameSelector;
    this._userAboutSelector = userAboutSelector;
    this._userAvatarSelector = userAvatarSelector;
    this._userAvatar = document.querySelector(this._userAvatarSelector);
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
    this._userAvatar.src = data.avatar;
  }

  setUserAvatar(data) {
    this._userAvatar.src = data.avatar
  }
}
  
