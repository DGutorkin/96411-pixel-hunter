import RulesView from '../views/rules-view';
import {SCREEN_ROUTE} from '../constants';

class RulesScreen {
  constructor() {
    this.view = new RulesView();
  }

  init(app) {
    RulesView.showScreen(this.view);

    this.view.onStart = (name) => {
      delete this.view._element;
      history.pushState(null, null, `#${SCREEN_ROUTE.GAME}`);
      app.startGame(name);
    };
  }
}

export default new RulesScreen();
