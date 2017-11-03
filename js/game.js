import GameView from './screens/game-view';
import results from './screens/results';
import timer from './timer';

const TIME_FOR_ANSWER = 30;
const fetchData = () => {
  // данные из задания
  const source = {
    paintings: [
      `https://k42.kn3.net/CF42609C8.jpg`,
      `https://k42.kn3.net/D2F0370D6.jpg`,
      `https://k32.kn3.net/5C7060EC5.jpg`
    ],
    photos: [
      `http://i.imgur.com/1KegWPz.jpg`,
      `https://i.imgur.com/DiHM5Zb.jpg`,
      `http://i.imgur.com/DKR1HtB.jpg`
    ]
  };

  // Преобразовываем данные от академии в map вида {url: type}
  // можно написать понятнее, но пока не известно какими будут итоговые данные
  // meme "И так сойдет"
  let sourceMap = new Map();
  [...source.paintings, ...source.photos].forEach((url, i) => {
    sourceMap.set(url, i < 3 ? `paint` : `photo`);
  });

  let data = [];
  for (let i = 0; i < 10; i++) {
    // каждый шаг содержит в себе от 1 до 3 URL с пояснением, что это painting|photo
    let step = new Map();
    // случайным образом генерим количество картинок на шаге
    let gameType = Math.floor(Math.random() * 3) + 1;
    // заполняем шаг уникальными изображениями:
    // map не позволит создать второй одинаковый ключ
    // TODO: для game-3 надо процессить изображения, чтоб был хоть 1 paint в подборке
    for (let j = 0; j < gameType; j++) {
      let randomIndex = Math.floor(Math.random() * sourceMap.size);
      let randomURL = [...sourceMap.keys()][randomIndex];
      step.set(randomURL, sourceMap.get(randomURL));
    }
    data.push(step);
  }
  return data;
};

let state = {
  timer: timer(TIME_FOR_ANSWER),
  lives: 3,
  position: 0,
  answers: new Array(10).fill(`unknown`),
  data: fetchData(),
  history: []
};

const resetState = () => {
  state.history.push({
    lives: state.lives,
    answers: [...state.answers]
  });
  state.timer = timer(TIME_FOR_ANSWER);
  state.lives = 3;
  state.position = 0;
  state.answers = new Array(10).fill(`unknown`);
};


const startGame = () => {
  let step = state.data[state.position];
  let game = new GameView(step, state.answers);
  game.header.drawLives(state.lives);
  state.timer.start();

  state.timer.onEnd = () => {
    onAnswer(`wrong`);
  };
  state.timer.onTick = (time) => {
    game.header.updateTimer(time);
  };

  const onAnswer = (result) => {
    state.timer.stop();
    if (result === `wrong`) {
      game.header.drawLives(--state.lives);
    } else {
      let answerTime = TIME_FOR_ANSWER - state.timer.value;
      if (answerTime < 10) {
        result = `fast`;
      }
      if (answerTime > 20) {
        result = `slow`;
      }
    }

    state.answers[state.position] = result;
    state.position++;
    if (state.lives >= 0 && state.position < 10) {
      state.timer.restart(TIME_FOR_ANSWER);
      step = state.data[state.position];
      game = new GameView(step, state.answers);
      game.onAnswer = onAnswer;
      GameView.showScreen(game);
    } else {
      game.header.updateTimer(``);
      resetState();
      GameView.showScreen(results(state.history));
    }
  };

  game.onAnswer = onAnswer;
  return game;
};

export default () => startGame();
