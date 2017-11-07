import GreetingView from '../views/greeting-view';
import {SCREEN_ROUTE} from '../constants';

class GreetingScreen {
  constructor() {
    this.view = new GreetingView();
  }

  init() {
    GreetingView.showScreen(this.view);

    this.view.onStart = () => {
      location.hash = SCREEN_ROUTE.RULES;
    };
  }
}


export default new GreetingScreen();
