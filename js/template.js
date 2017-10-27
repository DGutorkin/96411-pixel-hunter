/**
* Функция, возвращающая элемент, на основе переданной разметки
* @function getTemplate
* @param {string} htmlMarkup - HTML-разметка, помещаемый внутрь элемента
* @param {string} tagName - имя тэга, в который добавляется разметка
* @param {Array} classList - опциональный набор классов для элемента
* @return {HTMLElement}
*/
export default (htmlMarkup, tagName = `div`, classList = []) => {
  const element = document.createElement(tagName);
  element.classList.add(...classList);
  element.innerHTML = htmlMarkup;
  return element;
};
