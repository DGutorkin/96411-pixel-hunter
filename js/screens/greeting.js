import GreetingView from './greeting-view';
import App from '../application';

class GreetingScreen {
  constructor() {
    this.view = new GreetingView();
  }

  init() {
    GreetingView.showScreen(this.view);

    this.view.onStart = () => {
      App.showRules();
    };
  }
}

export default new GreetingScreen();
