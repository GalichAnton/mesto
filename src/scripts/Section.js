export default class Secion {
  constructor({  renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, method) {
    if (method === 'append') {
      this._container.append(element)
    } else if (method === 'prepend') {
      this._container.prepend(element);
    }
  }

  //Отрисовать элементы
  renderItems(api) {
    api.then((data) => {
        data.forEach((item) => {
          this._renderer(item);
        });
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`));
  }
}

