import getTemplate from '../template';

const processAnswer = (evt, step) => {
  evt.preventDefault();
  let choice = evt.currentTarget.querySelector(`input`).value;
  return choice === step.values().next().value ? `correct` : `wrong`;
};

export default (state, cb) => {
  let step = state.data[state.position];
  let template = getTemplate(`
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${step.keys().next().value}" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <div class="stats">
      <ul class="stats">
        ${state.answers.map((answer) => `<li class="stats__result stats__result--${answer}"></li>`).join(`\n`)}
      </ul>
    </div>`, `div`, [`game`]);

  // Строго следуем ТЗ. Формально правильнее проверять input на change, а не label на click
  [...template.querySelectorAll(`.game__answer`)].forEach((label) => {
    label.addEventListener(`click`, (evt) => {
      let result = processAnswer(evt, step);
      cb(result);
    });
  });

  return template;
};
