import introScreen from './screens/intro';
import greetingScreen from './screens/greeting';
import rulesScreen from './screens/rules';
import gameScreen from './game';
import ResultScreen from './screens/results';
import ENCODE_KEYS from './constants';

class Application {

  constructor() {
    this.onHashChange = this.onHashChange.bind(this);
    window.addEventListener(`hashchange`, this.onHashChange);

  }

  init() {
    this.onHashChange();
  }

  route(screen = `intro`) {
    const routes = {
      intro: Application.showIntro,
      greeting: Application.showGreeting,
      rules: Application.showRules,
      game: Application.startGame,
      stats: Application.showStats
    };
    if (typeof routes[screen] === `function`) {
      routes[screen]();
    } else {
      throw new Error(`Screen not found: [${screen}]`);
    }
  }

  onHashChange() {
    let screen = location.hash.replace(`#`, ``).split(`=`)[0];
    if (screen === ``) {
      this.route();
    } else {
      this.route(screen);
    }
  }


  static showIntro() {
    introScreen.init();
  }

  static showGreeting() {
    greetingScreen.init();
  }

  static showRules() {
    rulesScreen.init();
  }

  static startGame() {
    gameScreen.init();
  }

  static showStats() {
    // свап key/value
    const DECODE_KEYS = Object.assign({}, ...Object.entries(ENCODE_KEYS).map(([a, b]) => ({[b]: a})));

    let statsEncoded = location.hash.replace(`#`, ``).split(`=`)[1];
    let history = `unknown`;
    if (statsEncoded) {
      history = statsEncoded.split(`.`).map((gameEncoded) => {
        let gameArray = gameEncoded.split(``);
        let lives = gameArray.splice(-1);
        return {
          answers: gameArray.map((answer) => DECODE_KEYS[answer]),
          lives
        };
      });
    }

    let resultsScreen = new ResultScreen(history);
    resultsScreen.init();
  }
}

export default Application;
