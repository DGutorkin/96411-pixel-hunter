import AbstractView from '../abstract-view';
import header from './header';

export default class ResultsView extends AbstractView {
  constructor(history) {
    super();
    this._history = history;
  }

  get template() {
    const history = this._history.slice();
    return `
      <div class="result">
        <h1>Победа!</h1>
        ${history.reverse().map((game, i) => {
    let correct = game.answers.filter((answer) => answer === `correct`).length;
    let slow = game.answers.filter((answer) => answer === `slow`).length;
    let fast = game.answers.filter((answer) => answer === `fast`).length;
    let total = correct * 100 + slow * 50 + fast * 150;
    return `
            <table class="result__table">
              <tr>
                <td class="result__number">${i + 1}.</td>
                <td colspan="2">
                  <ul class="stats">
                    ${game.answers.map((answer) => `<li class="stats__result stats__result--${answer}"></li>`).join(`\n`)}
                  </ul>
                </td>
                <td class="result__points">×&nbsp;100</td>
                <td class="result__total">${game.lives > -1 ? (correct + slow + fast) * 100 : `FAIL`}</td>
              </tr>

              ${ fast > 0 ? `
                <tr>
                  <td></td>
                  <td class="result__extra">Бонус за скорость:</td>
                  <td class="result__extra">${fast}&nbsp;<span class="stats__result stats__result--fast"></span></td>
                  <td class="result__points">×&nbsp;50</td>
                  <td class="result__total">${fast * 50}</td>
                </tr>
              ` : ``}

              ${ game.lives > 0 ? `
                <tr>
                  <td></td>
                  <td class="result__extra">Бонус за жизни:</td>
                  <td class="result__extra">${game.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
                  <td class="result__points">×&nbsp;50</td>
                  <td class="result__total">${game.lives * 50}</td>
                </tr>
              ` : ``}

              ${ slow > 0 ? `
                <tr>
                  <td></td>
                  <td class="result__extra">Штраф за медлительность:</td>
                  <td class="result__extra">${slow}&nbsp;<span class="stats__result stats__result--slow"></span></td>
                  <td class="result__points">×&nbsp;50</td>
                  <td class="result__total">-${slow * 50}</td>
                </tr>
              ` : ``}

              <tr>
                <td colspan="5" class="result__total  result__total--final">${ game.lives > -1 ? total + game.lives * 50 : ``}</td>
              </tr>
            </table>
          `;
      }).join(`\n`)}
    </div>`.trim();
  }

  bind() {
    this.element.insertBefore(header().element, this.element.firstChild);
  }

}
