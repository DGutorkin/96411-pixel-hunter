import AbstractView from '../abstract-view';
import getHeader from './header';

export default class ResultsView extends AbstractView {
  constructor(history) {
    super();
    this._history = history;
  }

  get template() {
    return `
      <div class="result">
        <h1>Победа!</h1>
        ${this._history.reverse().map((game, i) => `
          <table class="result__table">
            <tr>
              <td class="result__number">${i + 1}.</td>
              <td colspan="2">
                <ul class="stats">
                  ${game.answers.map((answer) => `<li class="stats__result stats__result--${answer}"></li>`).join(`\n`)}
                </ul>
              </td>
              <td class="result__points">×&nbsp;100</td>
              <td class="result__total">${game.lives > -1 ?
    game.answers.filter((answer) => answer === `correct`).length * 100 :
    `FAIL`}</td>
            </tr>
            ${ game.lives > 0 ? `
              <tr>
                <td></td>
                <td class="result__extra">Бонус за жизни:</td>
                <td class="result__extra">${game.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
                <td class="result__points">×&nbsp;50</td>
                <td class="result__total">${game.lives * 50}</td>
              </tr>
            ` : ``}
            <tr>
              <td colspan="5" class="result__total  result__total--final">${ game.lives > -1 ? (game.answers.filter((answer) => answer === `correct`).length * 100) + game.lives * 50 : ``}</td>
            </tr>
          </table>
        `).join(`\n`)}
      </div>
    `.trim();
  }

  bind() {
    this.element.insertBefore(getHeader(), this.element.firstChild);
  }

}
