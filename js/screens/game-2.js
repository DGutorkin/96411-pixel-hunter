export default (step) => {
  return `
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
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
    </form>`.trim();
};
