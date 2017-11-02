export default class AbstractView {
  get template() {
    throw new Error(`You have to define template for view`);
  }

  render(tagName = `div`, classList = []) {
    const element = document.createElement(tagName);
    element.classList.add(...classList);
    element.innerHTML = this.template;
    return element;
  }

  bind() {}

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
}
