import getTemplate from '../template';
import getHeader from './header';

export default (data) => {

  // виды шаблонов игры, свойство === количеству картинок во входных данных
  const templates = {
    1: {
      task: `Угадай, фото или рисунок?`,
      content: `
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${data.pictures[0]}" alt="Option 1" width="705" height="455">
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
      action: (gameContent) => {
        [...gameContent.querySelectorAll(`.game__answer`)].forEach((label) => {
          label.addEventListener(`click`, () => {
            // следующая порция данных
          });
        });
      }
    },
    2: {
      task: `Угадайте для каждого изображения фото или рисунок?`,
      content: `
      <form class="game__content">
        ${data.pictures.map((pic, i) => `
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
      action: (gameContent) => {
        const radioButtons = [...gameContent.querySelectorAll(`input[type=radio]`)];
        radioButtons.forEach((radio) => {
          radio.addEventListener(`change`, () => {
            // альтернативно можно [...template.querySelectorAll(`.game__option input[type=radio]:checked`)]
            // но мне кажется итерация по готовому массиву будет быстрее
            if (radioButtons.filter((checkedRadio) => checkedRadio.checked).length === 2) {
              // следующая порция данных
            }
          });
        });
      }
    },
    3: {
      task: `Найдите рисунок среди изображений`,
      content: `
      <form class="game__content  game__content--triple">
        ${data.pictures.map((pic, i) => `
          <div class="game__option">
            <img src="${pic}" alt="Option ${i}" width="304" height="455">
          </div>
        `).join(``)}
      </form> `,
      action: (gameContent) => {
        [...gameContent.querySelectorAll(`.game__option`)].forEach((option) => {
          option.addEventListener(`click`, () => {
            // следующая порция данных
          });
        });
      }
    }
  };

  let template = getTemplate(`
    <p class="game__task">${templates[data.length].task}</p>
    ${templates[data.length].content}
  `, `div`, [`game`]);

  // проставляем листенеры
  templates[data.length].action();

  // апдейтим хедер
  template.insertBefore(getHeader({timer: `NN`, lives: 2}), template.firstChild);

  return template;

};
