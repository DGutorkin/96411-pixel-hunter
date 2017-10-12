import intro from './screens/intro';
import greeting from './screens/greeting';
import rules from './screens/rules';
import game1 from './screens/game-1';
import game2 from './screens/game-2';
import game3 from './screens/game-3';
import stats from './screens/stats';


const screenContainer = document.querySelector(`main.central`);
const screens = {intro, greeting, rules, game1, game2, game3, stats};

export default (screen) => {
  while (screenContainer.firstChild) {
    screenContainer.removeChild(screenContainer.firstChild);
  }
  screenContainer.appendChild(screens[screen]);
};
