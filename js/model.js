import timer from './timer';
import ENCODE_KEYS from './constants';

const TIME_FOR_ANSWER = 30;

export default class GameModel {
  constructor(state) {
    this.state = state;

    this.resetState = this.resetState.bind(this);
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

  nextLevel() {
    this.state.position++;
    this.restartTimer();
  }

  // сохраняем историю игр, но пока не умеем с ней работать
  saveGameStats() {
    this.state.history.push({
      answers: this.state.answers.slice(),
      lives: this.lives
    });
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

  encodeStats() {
    return this.state.history.map((game) => {
      let answersString = game.answers.map((answer) => ENCODE_KEYS[answer]).join(``);
      return `${answersString}${game.lives < 1 ? 0 : game.lives}`;
    }).join(`.`);
  }

  // возвращает тип игры вида game1, game2, game3 в зависимости от
  // количества картинок на текущем уровне. Используется GameView для выбора
  // подходящего шаблона
  get gameType() {
    return `game${this.step.size}`;
  }

  // сброс стейта путем присвоения начальных значений
  resetState() {
    this.resetTimer();
    this.state.position = 0;
    this.state.answers = new Array(10).fill(`unknown`);
    this.state.lives = 3;
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
