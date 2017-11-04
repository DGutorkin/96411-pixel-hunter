import AbstractView from './abstract';
import game1 from './gametypes/game-1';
import game2 from './gametypes/game-2';
import game3 from './gametypes/game-3';
import header from '../screens/header';

const games = {game1, game2, game3};

export default class GameView extends AbstractView {
  constructor(model) {
    super();
    this.model = model;
    this._header = header();
    this.drawStats();
  }

  // генерим разметку на основе подключенных модулей game-*, зависящих от step
  get template() {
    return `
      ${games[this.model.gameType](this.model.step)}
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

  renderLevel() {
    delete this._element;
    this._header.drawLives(this.model.lives);
    this.drawStats();
    AbstractView.showScreen(this);

  }

  drawStats() {
    const statsElement = this.element.querySelector(`ul.stats`);
    while (statsElement.firstChild) {
      statsElement.removeChild(statsElement.firstChild);
    }
    this.model.answers.forEach((answer) => {
      statsElement.appendChild(this.getStatElement(answer));
    });
  }

  getStatElement(answer) {
    let element = document.createElement(`li`);
    element.classList.add(`stats__result`, `stats__result--${answer}`);
    return element;
  }

  onAnswer() {}

  bind() {
    this.element.insertBefore(this.header.element, this.element.firstChild);

    this._listeners = {
      game1() {
        [...this.element.querySelectorAll(`.game__answer`)].forEach((label) => {
          label.addEventListener(`click`, (evt) => {
            evt.preventDefault();
            let choice = evt.currentTarget.querySelector(`input`).value;
            let result = choice === this.model.step.answers[0].type ? `correct` : `wrong`;
            this.onAnswer(result);
          });
        });
      },
      game2() {
        const radioButtons = [...this.element.querySelectorAll(`input[type=radio]`)];
        radioButtons.forEach((radio) => {
          radio.addEventListener(`change`, () => {
            let checkedBtns = [...this.element.querySelectorAll(`input[type=radio]:checked`)];
            if (checkedBtns.length === 2) {
              let results = checkedBtns.map((btn) => {
                let url = btn.closest(`.game__option`).querySelector(`img`).src;
                return this.model.answerIsCorrect(url, btn.value) ? 1 : 0;
              });
              let result = results.reduce((sum, value) => sum + value) === 2 ? `correct` : `wrong`;
              this.onAnswer(result);
            }
          });
        });
      },
      game3() {
        [...this.element.querySelectorAll(`.game__option`)].forEach((option) => {
          option.addEventListener(`click`, (evt) => {
            evt.preventDefault();
            let subtype = this.element.querySelector(`.game__task`).dataset.subtype;
            let url = evt.target.querySelector(`img`).src;
            let result = this.model.answerIsCorrect(url, subtype) ? `correct` : `wrong`;
            this.onAnswer(result);
          });
        });
      }
    };
    // биндим листенеры в зависимости от типа игры и в контексте объекта GameView
    this._listeners[this.model.gameType].call(this);
  }
}
