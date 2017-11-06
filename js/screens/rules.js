import RulesView from '../views/rules-view';

class RulesScreen {
  constructor() {
    this.view = new RulesView();
  }

  init(app) {
    RulesView.showScreen(this.view);

    this.view.onStart = (name) => {
      delete this.view._element;
      history.pushState(null, null, `#game`);
      app.startGame(name);
    };
  }
}

export default new RulesScreen();
