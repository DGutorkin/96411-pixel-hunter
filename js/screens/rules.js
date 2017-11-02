import RulesView from './rules-view';

import getGame from '../game';


const rules = new RulesView();
rules.onStart = () => {
  RulesView.showScreen(getGame());
};

export default () => rules;
