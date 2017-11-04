import GameView from './screens/game-view';
import GameModel from './model';
import getData from './data/game-data';

class GameScreen {
  // предполагаем, что в конструктор передается набор изображений для игры
  constructor(data = getData()) {
    this.model = GameModel.getInitialState();
    this.model.data = data;
    this.view = new GameView(this.model);

    this.onAnswer = this.onAnswer.bind(this);

    this.bind();
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
    this.view.header.updateTimer(``);
    location.hash = `stats=${this.model.encodeStats()}`;
  }

  stopGame() {
    this.model.stopTimer();
    this.model.resetState();
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
      this.nextLevel();
    }
  }

  bind() {
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

    // обработчик на header back btn
    this.view.header.onBack = () => this.stopGame();
  }
}

export default new GameScreen();
