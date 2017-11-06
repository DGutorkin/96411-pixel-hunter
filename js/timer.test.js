import assert from 'assert';
import getTimer from './timer';

describe(`Timer`, () => {
  it(`Initial timer saves it's value`, () => {
    assert.equal(getTimer(10).value, 10);
  });
  it(`One tick decrease timer value by 1`, () => {
    assert.equal(getTimer(10).tick(), 9);
  });
  it(`One tick decrease timer value by 1 and it's still unfinished`, () => {
    const timer = getTimer(10);
    timer.tick();
    assert(!timer.isFinished());
  });
  it(`timer.value can not be negative`, () => {
    const timer = getTimer(1);
    timer.tick();
    assert.equal(timer.tick(), 0);
  });
  it(`1-second timer becomes finished after 1 tick`, () => {
    const timer = getTimer(1);
    timer.tick();
    assert(timer.isFinished());
  });
});
