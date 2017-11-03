import RulesView from './rules-view';
import GameScreen from '../game';

const rules = new RulesView();
rules.onStart = () => {
  let game = new GameScreen();
  game.init();
};

export default () => rules;
