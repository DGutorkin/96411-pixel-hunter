import AbstractView from '../abstract-view';
import header from './header';
import game1 from './game-1';
import game2 from './game-2';
import game3 from './game-3';

const games = {game1, game2, game3};

export default class GameView extends AbstractView {
  constructor(step, answers) {
    super();
    this._step = step;
    this._type = step.size;
    this._answers = answers;
    this._header = header();
    this.drawStats();
  }

  // генерим разметку на основе подключенных модулей game-*, зависящих от step
  get template() {
    return `
      ${games[`game${this._type}`](this._step)}
      <div class="stats">
        <ul class="stats"></ul>
      </div>
    `;
  }

  // переписал render(), чтобы получить div класса game
  get element() {
    if (!this._element) {
      this._element = this.render(`div`, [`game`]);
      this.bind();
    }
    return this._element;
  }

  get header() {
    return this._header;
  }

  drawStats() {
    if (!this._statsElement) {
      this._statsElement = this.element.querySelector(`ul.stats`);
    }
    while (this._statsElement.firstChild) {
      this._statsElement.removeChild(this._statsElement.firstChild);
    }
    this._answers.forEach((answer) => {
      this._statsElement.appendChild(this.getStatElement(answer));
    });
  }

  getStatElement(answer) {
    let element = document.createElement(`li`);
    element.classList.add(`stats__result`, `stats__result--${answer}`);
    return element;
  }

  onAnswer() {}

  bind() {
    this.element.insertBefore(this._header.element, this.element.firstChild);

    this._listeners = {
      1() {
        [...this.element.querySelectorAll(`.game__answer`)].forEach((label) => {
          label.addEventListener(`click`, (evt) => {
            evt.preventDefault();
            let choice = evt.currentTarget.querySelector(`input`).value;
            let result = choice === this._step.values().next().value ? `correct` : `wrong`;
            this.onAnswer(result);
          });
        });
      },
      2() {
        const radioButtons = [...this.element.querySelectorAll(`input[type=radio]`)];
        radioButtons.forEach((radio) => {
          radio.addEventListener(`change`, () => {
            let checkedBtns = [...this.element.querySelectorAll(`input[type=radio]:checked`)];
            if (checkedBtns.length === 2) {
              let results = checkedBtns.map((btn) => {
                let url = btn.closest(`.game__option`).querySelector(`img`).src;
                return this._step.get(url) === btn.value ? 1 : 0;
              });
              let result = results.reduce((sum, value) => sum + value) === 2 ? `correct` : `wrong`;
              this.onAnswer(result);
            }
          });
        });
      },
      3() {
        [...this.element.querySelectorAll(`.game__option`)].forEach((option) => {
          option.addEventListener(`click`, (evt) => {
            evt.preventDefault();
            let url = evt.target.querySelector(`img`).src;
            let result = this._step.get(url) === `paint` ? `correct` : `wrong`;
            this.onAnswer(result);
          });
        });
      }
    };
    // биндим листенеры в зависимсти от типа игры и в контексте объекта GameView
    this._listeners[this._type].call(this);
  }
}
