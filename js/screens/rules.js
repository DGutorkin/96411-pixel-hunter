import RulesView from '../views/rules';

class RulesScreen {
  constructor() {
    this.view = new RulesView();
  }

  init() {
    RulesView.showScreen(this.view);

    this.view.onStart = () => {
      location.hash = `game`;
    };
  }
}

export default new RulesScreen();
