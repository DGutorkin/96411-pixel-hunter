import timer from './timer';
import Loader from './loader';
import App from './application';
import {ANSWER, TIME_FOR_ANSWER, INITIAL_LIVES} from './constants';

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

  // возвращает тип игры вида game1, game2, game3 в зависимости от
  // количества картинок на текущем уровне. Используется GameView для выбора
  // подходящего шаблона
  get gameType() {
    return `game${this.step._type}`;
  }

  decreaseLives() {
    return --this.state.lives;
  }

  restartTimer() {
    this.state.timer.restart(TIME_FOR_ANSWER.TOTAL);
  }

  stopTimer() {
    this.state.timer.stop();
  }

  startTimer() {
    this.state.timer.start();
  }

  resetTimer() {
    this.state.timer.value = TIME_FOR_ANSWER.TOTAL;
  }

  changeLevel() {
    this.state.position++;
    this.restartTimer();
  }

  // сохраняем ответ в state.answers: отрицательные сразу, для положительных - вычисляем скорость
  saveAnswer(result) {
    this.state.answers[this.position] = result === ANSWER.WRONG ? ANSWER.WRONG : this.getAnswerSpeed();
  }

  // может ли игра продолжаться дальше?
  isGameOver() {
    return !(this.state.lives >= 0 && this.state.position < 9);
  }

  // Если ответ правильный - вызываем эту функцию, чтобы определить скорость
  getAnswerSpeed() {
    let answer = ANSWER.CORRECT;
    const answerTime = TIME_FOR_ANSWER.TOTAL - this.state.timer.value;
    if (answerTime < TIME_FOR_ANSWER.FAST) {
      answer = ANSWER.FAST;
    }
    if (answerTime > TIME_FOR_ANSWER.SLOW) {
      answer = ANSWER.SLOW;
    }
    return answer;
  }

  // функция принимает адрес картинки и ответ пользователя
  // ищет тип изображения в текущем шаге по URL и сравнивает с ответом
  answerIsCorrect(url, userAnswer) {
    const choice = this.step.answers.filter((answer) => answer.image.url === url)[0];
    return userAnswer === choice.type;
  }

  processFromServer(data = []) {
    const date = new Date();
    this.state.history = data;
    const thisResults = {
      answers: this.state.answers.slice(),
      lives: this.lives,
      date: date.getTime()
    };
    this.state.history.push(thisResults);

    App.showStats(this.state.history);
    Loader.saveResults(thisResults, this.user);
  }

  getServerData() {
    const user = this.user;
    Loader.loadResults(user).then((res) => {
      this.processFromServer(res);
    }).catch(() => this.processFromServer());
  }

  // начальный стейт для новой игры
  static getInitialState() {
    return new GameModel({
      timer: timer(TIME_FOR_ANSWER.TOTAL),
      lives: INITIAL_LIVES,
      position: 0,
      answers: new Array(10).fill(`unknown`),
      history: []
    });
  }
}
