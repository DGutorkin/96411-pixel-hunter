import getTemplate from '../template';
import showScreen from '../screen';

// значения по умолчанию из шаблонов, который были захардкожены в разметке
const initialState = {
  timer: `NN`,
  lives: 3
};

export default (state = initialState) => {
  // простой хедер с кнопкой назад
  const statelessHeader = `
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
  `;

  // если переданный state не пустой, то заполняем зависимые элементы в разметку
  let statefullHeader = ``;
  if (Object.keys(state).length > 0) {
    statefullHeader = `
   <h1 class="game__timer">${state.timer}</h1>
   <div class="game__lives">
     ${new Array(state.lives)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}

     ${new Array(3 - state.lives)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
   </div>
   `;
  }

  // совмещаем разметку обоих хедеров внутри элемента header.header
  const header = getTemplate(statelessHeader + statefullHeader, `header`, [`header`]);

  header.querySelector(`.back`).addEventListener(`click`, () => showScreen(`greeting`));

  return header;
};
