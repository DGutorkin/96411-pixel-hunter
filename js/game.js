import GameView from './views/game';
import GameModel from './model';


class GameScreen {
  // предполагаем, что в конструктор передается набор изображений для игры
  constructor(data, username = `default`) {
    this.model = GameModel.getInitialState();
    this.model.data = data;
    this.model.user = username;
    this.view = new GameView(this.model);

    this.onAnswer = this.onAnswer.bind(this);

    this.bind();
  }

  init() {
    this.view.renderLevel();
    this.model.startTimer();
  }

  changeLevel() {
    this.model.changeLevel();
    this.view.renderLevel();
  }

  prepareStats() {
    this.view.header.updateTimer(``);
    this.model.getServerData();
  }

  stopGame() {
    this.model.stopTimer();
    this.model = GameModel.getInitialState();
  }

  onAnswer(result) {
    this.model.stopTimer();
    if (result === `wrong`) {
      this.view.header.drawLives(this.model.decreaseLives());
    }
    this.model.saveAnswer(result);
    if (this.model.isGameOver()) {
      this.prepareStats();
    } else {
      this.changeLevel();
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
    this.view.header.onBack = () => {
      // eslint-disable-next-line
      if (confirm(`Вся игра будет потеряна`)) {
        this.view.header.drawLives();
        this.stopGame();
        location.hash = `greeting`;
      }
    };
  }
}

export default GameScreen;
