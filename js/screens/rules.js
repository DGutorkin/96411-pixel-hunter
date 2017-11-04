import RulesView from '../views/rules';

class RulesScreen {
  constructor() {
    this.view = new RulesView();
  }

  init(app) {
    RulesView.showScreen(this.view);

    this.view.onStart = (name) => {
      app.startGame(name);
    };
  }
}

export default new RulesScreen();
