export default class Secion {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
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

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}

