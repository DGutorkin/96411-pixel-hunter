const processAnswer = (checkedBtns, step) => {
  let results = checkedBtns.map((btn) => {
    let url = btn.closest(`.game__option`).querySelector(`img`).src;
    return step.get(url) === btn.value ? 1 : 0;
  });
  return results.reduce((sum, value) => sum + value) === 2 ? `correct` : `wrong`;
};

export default (state) => {
  let step = state.data[state.position];
  return {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    content: `
    <form class="game__content">
      ${[...step.keys()].map((pic, i) => `
        <div class="game__option">
          <img src="${pic}" alt="Option ${i}" width="468" height="458">
          <label class="game__answer game__answer--photo">
            <input name="question${i}" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input name="question${i}" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
       `).join(``)}
    </form>`,
    action: (template, cb) => {
      const radioButtons = [...template.querySelectorAll(`input[type=radio]`)];
      radioButtons.forEach((radio) => {
        radio.addEventListener(`change`, () => {
          let checkedBtns = [...template.querySelectorAll(`input[type=radio]:checked`)];
          if (checkedBtns.length === 2) {
            let result = processAnswer(checkedBtns, step);
            cb(result);
          }
        });
      });
    }
  };
};
