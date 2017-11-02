import GreetingView from './greeting-view';
import rules from './rules';

const greeting = new GreetingView();
greeting.onStart = () => {
  GreetingView.showScreen(rules());
};

export default () => greeting;
