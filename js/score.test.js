import assert from 'assert';
import getScore from './score';


describe(`Score rules`, () => {
  it(`Got 10 slow answers with 3 lives remaining`, () => {
    assert.equal(getScore([2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 3), 650);
  });
  it(`Got 10 normal answers with 3 lives remaining`, () => {
    assert.equal(getScore([12, 12, 12, 12, 12, 12, 12, 12, 12, 12], 3), 1150);
  });
  it(`Got 10 fast answers with 3 lives remaining`, () => {
    assert.equal(getScore([22, 22, 22, 22, 22, 22, 22, 22, 22, 22], 3), 1650);
  });
  it(`Got 10 fast answers with 0 lives remaining`, () => {
    assert.equal(getScore([22, 22, 22, 22, 22, 22, 22, 22, 22, 22], 0), 1500);
  });
  it(`Got 3 normal, 3 fast and 3 slow answers with 2 lives remaining`, () => {
    assert.equal(getScore([12, 12, 12, 22, 22, 22, 2, 2, 2, 0], 2), 1000);
  });
  it(`Got less than 10 answers`, () => {
    assert.equal(getScore([0, 1, 2, 3, 4, 5], 2), -1);
  });
});
