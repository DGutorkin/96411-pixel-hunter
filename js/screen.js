import game from './game';
import intro from './screens/intro';
import greeting from './screens/greeting';
import rules from './screens/rules';
import stats from './screens/stats';


const screenContainer = document.querySelector(`main.central`);
const screens = {intro, greeting, rules, game, stats};

export default (screen) => {
  while (screenContainer.firstChild) {
    screenContainer.removeChild(screenContainer.firstChild);
  }
  let template = screen === `game` ? screens[screen]() : screens[screen];
  screenContainer.appendChild(template);
};
