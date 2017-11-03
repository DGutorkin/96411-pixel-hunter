import RulesView from './rules-view';
import game from '../game';

const rules = new RulesView();
rules.onStart = () => {
  RulesView.showScreen(game());
};

export default () => rules;
