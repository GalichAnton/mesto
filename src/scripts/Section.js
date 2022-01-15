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
  renderItems(items)  {
    items.forEach(element => {
      this._renderer(element);
    });
  }
}

