import IntroView from '../views/intro-view';
import {SCREEN_ROUTE} from '../constants';

class IntroScreen {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    IntroView.showScreen(this.view);

    this.view.onStart = () => {
      location.hash = SCREEN_ROUTE.GREETING;
    };
  }
}

export default new IntroScreen();
