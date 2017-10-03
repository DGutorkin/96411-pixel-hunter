const screenContainer = document.querySelector(`main.central`);
const asteriskButton = document.querySelector(`.intro__asterisk`);

// Определяем порядок следования экранов
const screensOrder = [`greeting`, `rules`, `game-1`, `game-2`, `game-3`, `stats`];
const screens = screensOrder.map((template) => document.getElementById(template));
const KEYCODE = {
  LEFT: 37,
  RIGHT: 39,
};

// Индекс текущего экрана приложения в массиве screens
let currentIndex;

/**
* Клонирует содержимое шаблона экрана в screenContainer. Обновляет переменную
* currentIndex, указывающую на индекс текущего экрана в массиве экранов screens.
* Дополнительно проверяется, что переданный индекс попадает в массив.
* @param {number} screenIndex - индекс элемента
*/
function showScreen(screenIndex) {
  if (screenIndex > -1 && screenIndex < screens.length) {
    while (screenContainer.childNodes.length > 0) {
      screenContainer.removeChild(screenContainer.firstChild);
    }
    screenContainer.append(
        document.importNode(screens[screenIndex].content, true)
    );
    currentIndex = screenIndex;
  }
}

/**
* Обработчик ALT+[left|right]arrow - инкрементит или де
* @param {KeyboardEvent} evt
*/
function _onDocumentKeyDown(evt) {
  if (evt.altKey && evt.keyCode === KEYCODE.LEFT) {
    showScreen(--currentIndex);
  }
  if (evt.altKey && evt.keyCode === KEYCODE.RIGHT) {
    showScreen(++currentIndex);
  }
}

/**
* Показываем приветственный экран по клику на звездочку
* Снимаем листенер, т.к. функция одноразовая - не ясно, надо ли т.к.
* элемент удаляется через removeChild
* @param {MouseEvent} evt
*/
function _onAsteriskClick(evt) {
  evt.target.removeEventListener(`click`, _onAsteriskClick);
  showScreen(0);
}

window.addEventListener(`keydown`, _onDocumentKeyDown);
asteriskButton.addEventListener(`click`, _onAsteriskClick);
