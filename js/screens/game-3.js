export default (step) => {
  return `
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      ${[...step.keys()].map((pic, i) => `
        <div class="game__option">
          <img src="${pic}" alt="Option ${i}" width="304" height="455">
        </div>
      `).join(``)}
    </form>`.trim();
};
