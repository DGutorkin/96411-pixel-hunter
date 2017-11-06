import IntroView from '../views/intro-view';

class IntroScreen {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    IntroView.showScreen(this.view);

    this.view.onStart = () => {
      // а вообще, тут нет магии, а обычное строковое значение говорящее само за себя
      // если завести const LOCATIONHASH.GREETING - код понятнее не станет
      location.hash = `greeting`;
    };
  }
}

export default new IntroScreen();
