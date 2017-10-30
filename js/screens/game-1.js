const processAnswer = (evt, step) => {
  evt.preventDefault();
  let choice = evt.currentTarget.querySelector(`input`).value;
  return choice === step.values().next().value ? `correct` : `wrong`;
};

export default (state) => {
  let step = state.data[state.position];
  return {
    task: `Угадай, фото или рисунок?`,
    content: `
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
      </form>`,
    action: (template, cb) => {
      // Строго следуем ТЗ. Формально правильнее проверять input на change, а не label на click
      [...template.querySelectorAll(`.game__answer`)].forEach((label) => {
        label.addEventListener(`click`, (evt) => {
          let result = processAnswer(evt, step);
          cb(result);
        });
      });
    }
  };
};
