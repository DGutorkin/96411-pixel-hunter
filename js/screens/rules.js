import RulesView from './rules-view';
import App from '../application';

class RulesScreen {
  constructor() {
    this.view = new RulesView();
  }

  init() {
    RulesView.showScreen(this.view);

    this.view.onStart = () => {
      App.startGame();
    };
  }
}

export default new RulesScreen();
