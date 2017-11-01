import getTemplate from '../template';

const processAnswer = (evt, step) => {
  evt.preventDefault();
  let url = evt.target.querySelector(`img`).src;
  return step.get(url) === `paint` ? `correct` : `wrong`;
};

export default (state, cb) => {
  let step = state.data[state.position];
  let template = getTemplate(`
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      ${[...step.keys()].map((pic, i) => `
        <div class="game__option">
          <img src="${pic}" alt="Option ${i}" width="304" height="455">
        </div>
      `).join(``)}
    </form>
    <div class="stats">
      <ul class="stats">
        ${state.answers.map((answer) => `<li class="stats__result stats__result--${answer}"></li>`).join(`\n`)}
      </ul>
    </div>`, `div`, [`game`]);

  [...template.querySelectorAll(`.game__option`)].forEach((option) => {
    option.addEventListener(`click`, (evt) => {
      let result = processAnswer(evt, step);
      cb(result);
    });
  });

  return template;
};
