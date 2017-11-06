import ResultsView from '../views/results-view';

export default class RulesScreen {
  constructor(history) {
    this.view = new ResultsView(history);
  }

  init() {
    ResultsView.showScreen(this.view);
  }
}
