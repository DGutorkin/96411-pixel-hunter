import assert from 'assert';
import getScore from './score';

/**
* @function
* @name getAnswers - генерация пользовательских ответов
* @param {boolean} success - генерятся успешные/неуспешные ответы
* @param {number} time - время ответа в секундах
* @param {number} length - длина возвращаемого массива (кол-во ответа пользователем)
* @return {Array} возвращает массив ответов пользователей для тестирования
*/

const getAnswers = (success, time, length) => {
  let testObject = [];
  for (let i = 0; i < length; i++) {
    testObject.push({success, time});
  }
  return testObject;
};


describe(`Score rules`, () => {
  it(`Got 10 slow answers with 3 lives remaining`, () => {
    assert.equal(getScore(getAnswers(true, 22, 10), 3), 650);
  });

  it(`Got 10 normal answers with 3 lives remaining`, () => {
    assert.equal(getScore(getAnswers(true, 12, 10), 3), 1150);
  });

  it(`Got 10 fast answers with 3 lives remaining`, () => {
    assert.equal(getScore(getAnswers(true, 8, 10), 3), 1650);
  });

  it(`Got 10 fast answers with 0 lives remaining`, () => {
    assert.equal(getScore(getAnswers(true, 8, 10), 0), 1500);
  });

  it(`All answers required more than 30 seconds`, () => {
    assert.equal(getScore(getAnswers(true, 32, 10), 0), 0);
  });

  it(`All answers required more than 30 seconds, but 2 lives remaining`, () => {
    assert.equal(getScore(getAnswers(true, 32, 10), 2), 100);
  });

  it(`Got less than 10 answers`, () => {
    assert.equal(getScore(getAnswers(true, 8, 8), 0), -1);
  });

  it(`Got 9 normal and one fast answer with 3 lives remaining `, () => {
    assert.equal(getScore(
        [...getAnswers(true, 12, 9), {success: true, time: 8}],
        3), 1200);
  });
  it(`Got 9 normal and one answer longer than 30 sec with 3 lives remaining `, () => {
    assert.equal(getScore(
        [...getAnswers(true, 12, 9), {success: true, time: 33}],
        3), 1050);
  });
});
