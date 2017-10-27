import getTemplate from '../template';
import showScreen from '../screen';

const template = getTemplate(`
  <div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>
`);
const asteriskButton = template.querySelector(`.intro__asterisk`);
asteriskButton.addEventListener(`click`, onAsteriskClick);

/**
* Показываем приветственный экран по клику на звездочку
* Снимаем листенер, т.к. функция одноразовая - не ясно, надо ли т.к.
* элемент удаляется через removeChild
* @param {MouseEvent} evt
*/
function onAsteriskClick(evt) {
  evt.target.removeEventListener(`click`, onAsteriskClick);
  showScreen(`greeting`);
}

export default template;
