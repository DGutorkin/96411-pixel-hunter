export default (step) => {
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
    action: (template) => {
      const radioButtons = [...template.querySelectorAll(`input[type=radio]`)];
      radioButtons.forEach((radio) => {
        radio.addEventListener(`change`, () => {
          // альтернативно можно [...template.querySelectorAll(`.game__option input[type=radio]:checked`)]
          // но мне кажется итерация по готовому массиву будет быстрее
          if (radioButtons.filter((checkedRadio) => checkedRadio.checked).length === 2) {
            console.info(`следующая порция данных`);
          }
        });
      });
    }
  };
};
