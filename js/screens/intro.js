import IntroView from '../views/intro';

class IntroScreen {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    IntroView.showScreen(this.view);

    this.view.onStart = () => {
      location.hash = `greeting`;
    };
  }
}

export default new IntroScreen();
