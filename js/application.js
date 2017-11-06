import introScreen from './screens/intro';
import greetingScreen from './screens/greeting';
import rulesScreen from './screens/rules';
import GameScreen from './game';
import ResultScreen from './screens/results';
import Loader from './loader';
import adapt from './data/adapter';

export default class Application {
  constructor() {
    this.onHashChange = this.onHashChange.bind(this);
    this.startGame = this.startGame.bind(this);
    this.showRules = this.showRules.bind(this);
    window.addEventListener(`hashchange`, this.onHashChange);
  }

  init(data) {
    this._data = data;
    this.onHashChange();
  }

  routeTo(screen = `intro`) {
    const routes = {
      intro: this.showIntro,
      greeting: this.showGreeting,
      rules: this.showRules,
      game: this.startGame,
      stats: Application.showStats
    };
    if (typeof routes[screen] === `function`) {
      routes[screen]();
    } else {
      throw new Error(`Screen not found: [${screen}]`);
    }
  }

  showIntro() {
    introScreen.init();
  }

  showGreeting() {
    greetingScreen.init();
  }

  showRules() {
    rulesScreen.init(this);
  }

  startGame(username) {
    const gameScreen = new GameScreen(this._data, username);
    gameScreen.init();
  }

  onHashChange() {
    const screen = location.hash.replace(`#`, ``).split(`=`)[0];
    if (screen === ``) {
      this.routeTo();
    } else {
      this.routeTo(screen);
    }
  }

  static showStats(history = `unknown`) {
    const resultsScreen = new ResultScreen(history);
    resultsScreen.init();
  }

}

const app = new Application();
Loader.loadData().
    then(adapt).
    then((data) => app.init(data)).
    catch(window.console.error);
