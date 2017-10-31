import intro from './screens/intro';
import greeting from './screens/greeting';
import rules from './screens/rules';


const screenContainer = document.querySelector(`main.central`);
const screens = {intro, greeting, rules};

export default (screen) => {
  while (screenContainer.firstChild) {
    screenContainer.removeChild(screenContainer.firstChild);
  }
  if (typeof screen === `string`) {
    screenContainer.appendChild(screens[screen]);
  } else {
    screenContainer.appendChild(screen);
  }
};
