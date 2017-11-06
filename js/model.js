import timer from './timer';
import Loader from './loader';
import App from './application';

const TIME_FOR_ANSWER = 30;

export default class GameModel {
  constructor(state) {
    this.state = state;
  }

  get position() {
    return this.state.position;
  }

  get step() {
    return this.data[this.position];
  }

  get answers() {
    return this.state.answers;
  }

  get lives() {
    return this.state.lives;
  }

  get history() {
    return this.state.history;
  }

  decreaseLives() {
    return --this.state.lives;
  }

  restartTimer() {
    this.state.timer.restart(TIME_FOR_ANSWER);
  }

  stopTimer() {
    this.state.timer.stop();
  }

  startTimer() {
    this.state.timer.start();
  }

  resetTimer() {
    this.state.timer.value = 30;
  }

  changeLevel() {
    this.state.position++;
    this.restartTimer();
  }

  // сохраняем ответ в state.answers: отрицательные сразу, для положительных - вычисляем скорость
  saveAnswer(result) {
    this.state.answers[this.position] = result === `wrong` ? `wrong` : this.getAnswerSpeed();
  }

  // может ли игра продолжаться дальше?
  isGameOver() {
    return !(this.state.lives >= 0 && this.state.position < 9);
  }

  // Если ответ правильный - вызываем эту функцию, чтобы определить скорость
  getAnswerSpeed() {
    let answer = `correct`;
    let answerTime = TIME_FOR_ANSWER - this.state.timer.value;
    if (answerTime < 10) {
      answer = `fast`;
    }
    if (answerTime > 20) {
      answer = `slow`;
    }
    return answer;
  }

  // возвращает тип игры вида game1, game2, game3 в зависимости от
  // количества картинок на текущем уровне. Используется GameView для выбора
  // подходящего шаблона
  get gameType() {
    return `game${this.step._type}`;
  }

  // функция принимает адрес картинки и ответ пользователя
  // ищет тип изображения в текущем шаге по URL и сравнивает с ответом
  answerIsCorrect(url, userAnswer) {
    let choice = this.step.answers.filter((answer) => answer.image.url === url)[0];
    return userAnswer === choice.type;
  }

  processFromServer(data = []) {
    let date = new Date();
    this.state.history = data;
    let thisResults = {
      answers: this.state.answers.slice(),
      lives: this.lives,
      date: date.getTime()
    };
    this.state.history.push(thisResults);

    App.showStats(this.state.history);
    Loader.saveResults(thisResults, this.user);
  }

  getServerData() {
    let user = this.user;
    Loader.loadResults(user).then((res) => {
      this.processFromServer(res);
    }).catch(() => this.processFromServer());
  }

  // начальный стейт для новой игры
  static getInitialState() {
    return new GameModel({
      timer: timer(TIME_FOR_ANSWER),
      lives: 3,
      position: 0,
      answers: new Array(10).fill(`unknown`),
      history: []
    });
  }
}
