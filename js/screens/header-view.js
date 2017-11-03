import AbstractView from '../abstract-view';
import greeting from './greeting';

export default class HeaderView extends AbstractView {
  get template() {
    return `
      <div class="header__back">
        <button class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.svg" width="101" height="44">
        </button>
      </div>
      <h1 class="game__timer"></h1>
      <div class="game__lives"></div>
    `.trim();
  }

  get element() {
    if (!this._element) {
      this._element = this.render(`header`, [`header`]);
      this.bind();
    }
    return this._element;
  }

  // отрисовка оставшихся жизней
  drawLives(lives) {
    if (!this._livesElement) {
      this._livesElement = this.element.querySelector(`.game__lives`);
    }
    while (this._livesElement.firstChild) {
      this._livesElement.removeChild(this._livesElement.firstChild);
    }
    if (lives > -1) {
      for (let i = 0; i < lives; i++) {
        this._livesElement.appendChild(this.getHeartElement());
      }
      for (let i = 0; i < 3 - lives; i++) {
        this._livesElement.appendChild(this.getHeartElement(`empty`));
      }
    }
  }

  updateTimer(time) {
    if (!this._timer) {
      this._timer = this.element.querySelector(`.game__timer`);
    }
    this._timer.textContent = time;
  }

  getHeartElement(type = `full`) {
    let img = document.createElement(`img`);
    img.classList.add(`game__heart`);
    img.alt = `Life`;
    img.width = 32;
    img.height = 32;
    img.src = `img/heart__${type}.svg`;
    return img;
  }

  bind() {
    this.element.querySelector(`.back`).addEventListener(`click`, () => {
      AbstractView.showScreen(greeting());
    });
  }
}
