import getTemplate from '../template';
import showScreen from '../screen';
import getHeader from './header';

const template = getTemplate(`
  <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>
`);

// тут конечно еще пойдет .insertAdjacentElement('afterbegin', element)
template.insertBefore(getHeader(), template.firstChild);

const rulesInput = template.querySelector(`.rules__input`);
const rulesButton = template.querySelector(`.rules__button`);

/**
* Вроде как disabled-кнопки на формах - это антипаттерн.
* Лучше менять поведение onclick в зависимости от логики формы.
* @see https://axesslab.com/disabled-buttons-suck/
*/
rulesInput.addEventListener(`keyup`, () => {
  rulesButton.disabled = rulesInput.value.length === 0;
});


/**
* Альтернативно можно было бы повесить eventListener на сабмит формы,
* но т.к. rulesButton у нас уже записано в переменную - работаем дальше с ней.
*/
rulesButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  showScreen(`game`);
});


export default template;
