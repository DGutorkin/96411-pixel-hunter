const processAnswer = (evt, step) => {
  evt.preventDefault();
  let url = evt.target.querySelector(`img`).src;
  return step.get(url) === `paint` ? `correct` : `wrong`;
};

export default (state) => {
  let step = state.data[state.position];
  return {
    task: `Найдите рисунок среди изображений`,
    content: `
    <form class="game__content  game__content--triple">
      ${[...step.keys()].map((pic, i) => `
        <div class="game__option">
          <img src="${pic}" alt="Option ${i}" width="304" height="455">
        </div>
      `).join(``)}
    </form> `,
    action: (template, cb) => {
      [...template.querySelectorAll(`.game__option`)].forEach((option) => {
        option.addEventListener(`click`, (evt) => {
          let result = processAnswer(evt, step);
          cb(result);
        });
      });
    }
  };
};
