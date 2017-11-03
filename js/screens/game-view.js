import AbstractView from '../abstract-view';
import game1 from './game-1';
import game2 from './game-2';
import game3 from './game-3';

const games = {game1, game2, game3};

export default class GameView extends AbstractView {
  constructor(step) {
    super();
    this._step = step;
    this._type = step.size;
  }

  get template() {
    return games[`game${this._type}`](this._step);
  }

  // переписал render(), чтобы получить div класса game
  get element() {
    if (!this._element) {
      this._element = this.render(`div`, [`game`]);
      this.bind();
    }
    return this._element;
  }

  onAnswer() {}

  bind() {
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
    this._listeners[this._type].call(this);
  }
}
