import ResultsView from '../views/results';

export default class RulesScreen {
  constructor(history) {
    this.view = new ResultsView(history);
  }

  init() {
    ResultsView.showScreen(this.view);
  }
}
