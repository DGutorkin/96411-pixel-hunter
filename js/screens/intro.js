import IntroView from './intro-view';
import App from '../application';

class IntroScreen {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    IntroView.showScreen(this.view);

    this.view.onStart = () => {
      App.showGreeting();
    };
  }
}

export default new IntroScreen();
