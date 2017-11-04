import RulesView from '../views/rules';

class RulesScreen {
  constructor() {
    this.view = new RulesView();
  }

  init() {
    RulesView.showScreen(this.view);

    this.view.onStart = (name) => {
      location.hash = `game=${name}`;
    };
  }
}

export default new RulesScreen();
