import GreetingView from './greeting-view';

class GreetingScreen {
  constructor() {
    this.view = new GreetingView();
  }

  init() {
    GreetingView.showScreen(this.view);

    this.view.onStart = () => {
      location.hash = `rules`;
    };
  }
}

export default new GreetingScreen();
