import introScreen from './screens/intro';
import greetingScreen from './screens/greeting';
import rulesScreen from './screens/rules';
import GameScreen from './game';
import ResultScreen from './screens/results';
import Loader from './loader';
import adapt from './data/adapter';
import ENCODE_KEYS from './constants';

export default class Application {
  constructor() {
    this.onHashChange = this.onHashChange.bind(this);
    this.startGame = this.startGame.bind(this);
    window.addEventListener(`hashchange`, this.onHashChange);
  }

  init(data) {
    this._data = data;
    this.onHashChange();
  }

  route(screen = `intro`) {
    const routes = {
      intro: this.showIntro,
      greeting: this.showGreeting,
      rules: this.showRules,
      game: this.startGame,
      stats: this.showStats
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

  showIntro() {
    introScreen.init();
  }

  showGreeting() {
    greetingScreen.init();
  }

  showRules() {
    rulesScreen.init();
  }

  startGame() {
    let gameScreen = new GameScreen(this._data);
    gameScreen.init();
  }

  showStats() {
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

const app = new Application();
Loader.loadData().
    then(adapt).
    then((data) => app.init(data)).
    catch(window.console.error);