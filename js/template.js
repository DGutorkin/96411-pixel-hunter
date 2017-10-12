export default (htmlMarkup) => {
  const element = document.createElement(`div`);
  element.innerHTML = htmlMarkup;

  return element;
};
