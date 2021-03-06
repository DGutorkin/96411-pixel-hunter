import AbstractView from './abstract-view';
import header from '../screens/header';
import {ANSWER, SCORE, SCREEN_ROUTE} from '../constants';

export default class ResultsView extends AbstractView {
  constructor(history = `unknown`) {
    super();
    if (Array.isArray(history)) {
      this._history = history.reverse();
    }
  }

  get template() {
    let resultPage = `<div class="result"><h1>Сначала пройдите игру</h1></div>`;
    if (this.gameIsValid()) {
      resultPage = `
      <div class="result">
        <h1>${ this.isWin(this._history[0]) ? `Победа!` : `Поражение!`}</h1>
        ${this._history.map((game, i) => {
    const victory = this.isWin(game);
    const correct = game.answers.filter((answer) => answer === ANSWER.CORRECT).length;
    const slow = game.answers.filter((answer) => answer === ANSWER.SLOW).length;
    const fast = game.answers.filter((answer) => answer === ANSWER.FAST).length;
    const total = correct * SCORE.CORRECT + slow * SCORE.SLOW + fast * SCORE.FAST;
    return `
            <table class="result__table">
              <tr>
                <td class="result__number">${i + 1}.</td>
                <td colspan="2">
                  <ul class="stats">
                    ${game.answers.map((answer) => `<li class="stats__result stats__result--${answer}"></li>`).join(`\n`)}
                  </ul>
                </td>
                <td class="result__points">${ victory ? `×&nbsp;100` : ``}</td>
                <td class="result__total">${ victory ? (correct + slow + fast) * SCORE.CORRECT : `FAIL`}</td>
              </tr>

              ${ victory && fast > 0 ? `
                <tr>
                  <td></td>
                  <td class="result__extra">Бонус за скорость:</td>
                  <td class="result__extra">${fast}&nbsp;<span class="stats__result stats__result--fast"></span></td>
                  <td class="result__points">×&nbsp;50</td>
                  <td class="result__total">${fast * 50}</td>
                </tr>
              ` : ``}

              ${ victory && game.lives > 0 ? `
                <tr>
                  <td></td>
                  <td class="result__extra">Бонус за жизни:</td>
                  <td class="result__extra">${game.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
                  <td class="result__points">×&nbsp;50</td>
                  <td class="result__total">${game.lives * 50}</td>
                </tr>
              ` : ``}

              ${ victory && slow > 0 ? `
                <tr>
                  <td></td>
                  <td class="result__extra">Штраф за медлительность:</td>
                  <td class="result__extra">${slow}&nbsp;<span class="stats__result stats__result--slow"></span></td>
                  <td class="result__points">×&nbsp;50</td>
                  <td class="result__total">-${slow * 50}</td>
                </tr>
              ` : ``}

              <tr>
                <td colspan="5" class="result__total  result__total--final">${ victory ? total + game.lives * 50 : ``}</td>
              </tr>
            </table>
          `;
  }).join(`\n`)}
    </div>`.trim();
    }

    return resultPage;
  }

  isWin(game) {
    return game.answers.length === 10 &&
           game.answers.filter((answer) => answer === ANSWER.WRONG).length < 4 &&
           game.lives > -1;
  }

  gameIsValid() {
    return typeof this._history === `object` && this._history.length > 0;
  }

  bind() {

    const headerScreen = header();
    headerScreen.onBack = () => {
      location.hash = SCREEN_ROUTE.GREETING;
    };
    this.element.insertBefore(headerScreen.element, this.element.firstChild);
  }

}
