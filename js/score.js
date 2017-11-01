/**
* Функция, определяющая правила начисления балов
* @function getScoreByTime
* @param {number} time - время, полученное от таймера
* Предполагается, что:
* - если время закончилось time === 0,
* - если пользователь выбрал неправильный ответ time === -1
* - во всех остальных случаях time === оставшееся время на ответ
* @return {number} количество полученных баллов
*/
const getScoreByTime = (time) => {
  let score = 0;
  if (time > 20) {
    score = 150;
  } else if (time > 10) {
    score = 100;
  } else if (time > 0) {
    score = 50;
  }
  return score;
};

/**
* Подсчет суммарного количества балов на основе ответов пользователя
* @function getScore
* @param {Array} answers - массив с ответами пользователя
* @param {number} lives - количество оставшихся жизней
* @return {number} количество баллов или -1, если игра провалена
*/
export default (answers, lives) => {
  if (answers.length === 10) {
    let score = answers.reduce((sum, time) => sum + getScoreByTime(time), 0);
    score += lives * 50;
    return score;
  }
  return -1;
};
