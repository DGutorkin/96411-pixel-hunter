import introScreen from './screens/intro';
import greetingScreen from './screens/greeting';
import rulesScreen from './screens/rules';
import gameScreen from './game';
import ResultScreen from './screens/results';

export default class Application {

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

  static showStats(history) {
    let resultsScreen = new ResultScreen(history);
    resultsScreen.init();
  }

}
