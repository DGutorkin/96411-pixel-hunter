import GameView from './screens/game-view';
import GameModel from './model';
import results from './screens/results';
import getData from './data/game-data';

export default class GameScreen {
  // предполагаем, что в конструктор передается набор изображений для игры
  // первую пачку изображений используем для инициализации View.
  constructor(data = getData()) {
    this.model = GameModel.getInitialState();
    this.model.data = data;
    this.view = new GameView(this.model);

    this.onAnswer = this.onAnswer.bind(this);
    this.view.onAnswer = this.onAnswer;

    // вешаем обработчики на таймер:
    // таймер кончился = ответ wrong
    this.model.state.timer.onEnd = () => {
      this.onAnswer(`wrong`);
    };
    // таймер тикнул - проапдейтили хедер
    this.model.state.timer.onTick = (time) => {
      this.view.header.updateTimer(time);
    };
  }

  init() {
    this.view.renderLevel();
    this.model.startTimer();
  }

  nextLevel() {
    this.model.nextLevel();
    this.view.renderLevel();
  }

  gameOver() {
    this.model.saveGameStats();
    GameView.showScreen(results(this.model.history));
  }

  onAnswer(result) {
    this.model.stopTimer();
    if (result === `wrong`) {
      this.view.header.drawLives(this.model.decreaseLives());
    }
    this.model.saveAnswer(result);
    if (this.model.isGameOver()) {
      this.gameOver();
    } else {
      this.model.nextLevel();
      this.view.renderLevel();
    }
  }

}
