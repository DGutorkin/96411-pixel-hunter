import assert from 'assert';
import getTimer from './timer';

describe(`Timer`, () => {
  it(`Initial timer saves it's value`, () => {
    assert.equal(getTimer(10).value, 10);
  });
  it(`One tick decrease timer value by 1`, () => {
    assert.equal(getTimer(10).tick().value, 9);
  });
  it(`One tick decrease timer value by 1 and it's still unfinished`, () => {
    assert(!getTimer(10).tick().isFinished());
  });
  it(`timer.value can not be negative`, () => {
    assert.equal(getTimer(1).tick().tick().value, 0);
  });
  it(`1-second timer becomes finished after 1 tick`, () => {
    assert(getTimer(1).tick().isFinished());
  });
});
