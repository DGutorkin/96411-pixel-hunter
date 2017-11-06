import AbstractView from './abstract-view';
import header from '../screens/header';

export default class ResultsView extends AbstractView {
  constructor(history) {
    super();
    if (Array.isArray(history)) {
      this._history = history.reverse();
    }
  }

  isWin(game) {
    return game.answers.length === 10 &&
           game.answers.filter((answer) => answer === `wrong`).length < 4 &&
           game.lives > -1;
  }

  gameIsValid() {
    return typeof this._history === `object` && this._history.length > 0;
  }

  get template() {
    let resultPage = `<div class="result"><h1>Сначала пройдите игру</h1></div>`;
    if (this.gameIsValid()) {
      resultPage = `
      <div class="result">
        <h1>${ this.isWin(this._history[0]) ? `Победа!` : `Поражение!`}</h1>
        ${this._history.map((game, i) => {
    const victory = this.isWin(game);
    const correct = game.answers.filter((answer) => answer === `correct`).length;
    const slow = game.answers.filter((answer) => answer === `slow`).length;
    const fast = game.answers.filter((answer) => answer === `fast`).length;
    const total = correct * 100 + slow * 50 + fast * 150;
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
                <td class="result__total">${ victory ? (correct + slow + fast) * 100 : `FAIL`}</td>
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

  bind() {

    const headerScreen = header();
    headerScreen.onBack = () => {
      location.hash = `greeting`;
    };
    this.element.insertBefore(headerScreen.element, this.element.firstChild);
  }

}
