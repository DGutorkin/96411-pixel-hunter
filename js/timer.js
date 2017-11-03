/**
 * Создает объект таймера
 * @function timer
 * @param {number} value - количество секунд сколько тикать
 * @return {Object} - возвращает объект таймера с двумя методами tick() и isFinished()
 */
const timer = (value) => {
  return {
    value,
    onEnd() {},
    onTick() {},
    start() {
      this.id = setInterval(() => {
        this.tick();
        if (this.isFinished()) {
          this.onEnd();
        }
      }, 1000);
    },
    stop() {
      clearInterval(this.id);
    },
    tick() {
      this.onTick(this.value);
      this.value--;
      return this.value;
    },
    isFinished() {
      return this.value < 0;
    },
    restart(time) {
      this.value = time;
      this.start();
    }
  };
};
export default timer;
