export const ANSWER = {
  WRONG: `wrong`,
  UNKNOWN: `unknown`,
  SLOW: `slow`,
  CORRECT: `correct`,
  FAST: `fast`,
};

// время на ответ в секундах
// TOTAL - всего
// SLOW - медленный ответ более 20 секунд
// FAST - быстрее 10 секунд
export const TIME_FOR_ANSWER = {
  TOTAL: 30,
  SLOW: 20,
  FAST: 10
};

// соответствие баллам, начисленным за разные варианты ответа
export const SCORE = {
  SLOW: 50,
  CORRECT: 100,
  FAST: 150,
};

// количество жизней в начале игры
export const INITIAL_LIVES = 3;

// время мигания таймера
export const BLINKING_TIME = 5;

export const SCREEN_ROUTE = {
  INTRO: `intro`,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`
};
