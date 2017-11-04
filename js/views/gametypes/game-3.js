export default (step) => {
  let subtype = step.question === `Найдите рисунок среди изображений` ? `paint` : `photo`;
  return `
    <p class="game__task" data-subtype="${subtype}">${step.question}</p>
    <form class="game__content  game__content--triple">
      ${[...step.answers].map((pic, i) => `
        <div class="game__option">
          <img src="${pic.image.url}" alt="Option ${i}" width="304" height="455">
        </div>
      `).join(``)}
    </form>`.trim();
};
