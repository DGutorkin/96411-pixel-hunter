/** @function
* @name getTimer - создает объект таймера
* @param {number} value - количество секунд сколько тикать
* @return {Object} - возвращает объект таймера с двумя методами tick() и isFinished()
*/

const getTimer = (value) => {
  return {
    value,
    tick() {
      return this.value < 1 ? getTimer(0) : getTimer(this.value - 1);
    },
    isFinished() {
      return this.value < 1;
    }
  };
};
export default getTimer;
