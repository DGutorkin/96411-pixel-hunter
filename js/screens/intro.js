import IntroView from './intro-view';
import greeting from './greeting';

const intro = new IntroView();
intro.onStart = () => {
  IntroView.showScreen(greeting());
};

export default () => intro;
