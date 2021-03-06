import AbstractView from './abstract-view';
import game1 from './gametypes/game-1';
import game2 from './gametypes/game-2';
import game3 from './gametypes/game-3';
import header from '../screens/header';
import {ANSWER} from '../constants';

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
    const element = document.createElement(`li`);
    element.classList.add(`stats__result`, `stats__result--${answer}`);
    return element;
  }

  bind() {
    this.element.insertBefore(this.header.element, this.element.firstChild);

    this._listeners = {
      game1() {
        for (let label of this.element.querySelectorAll(`.game__answer`)) {
          label.addEventListener(`click`, (evt) => {
            evt.preventDefault();
            const choice = evt.currentTarget.querySelector(`input`).value;
            const result = choice === this.model.step.answers[0].type ? ANSWER.CORRECT : ANSWER.WRONG;
            this.onAnswer(result);
          });
        }
      },
      game2() {
        const radioButtons = this.element.querySelectorAll(`input[type=radio]`);
        for (let radio of radioButtons) {
          radio.addEventListener(`change`, () => {
            const checkedBtns = [...this.element.querySelectorAll(`input[type=radio]:checked`)];
            if (checkedBtns.length === 2) {
              const results = checkedBtns.map((btn) => {
                let url = btn.closest(`.game__option`).querySelector(`img`).src;
                return this.model.answerIsCorrect(url, btn.value) ? 1 : 0;
              });
              const result = results.reduce((sum, value) => sum + value) === 2 ? ANSWER.CORRECT : ANSWER.WRONG;
              this.onAnswer(result);
            }
          });
        }
      },
      game3() {
        for (let option of this.element.querySelectorAll(`.game__option`)) {
          option.addEventListener(`click`, (evt) => {
            evt.preventDefault();
            const subtype = this.element.querySelector(`.game__task`).dataset.subtype;
            const url = evt.target.querySelector(`img`).src;
            const result = this.model.answerIsCorrect(url, subtype) ? ANSWER.CORRECT : ANSWER.WRONG;
            this.onAnswer(result);
          });
        }
      }
    };
    // биндим листенеры в зависимости от типа игры и в контексте объекта GameView
    this._listeners[this.model.gameType].call(this);
  }

  onAnswer() {}
}
