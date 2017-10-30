import getTemplate from './template';
import getHeader from './screens/header';
import game1 from './screens/game-1';
import game2 from './screens/game-2';
import game3 from './screens/game-3';
import showScreen from './screen';


// сохраняем разметку и eventListeners для каждого типа игры в объект games
const games = {game1, game2, game3};

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
  timer: `NN`,
  lives: 3,
  position: 0,
  answers: new Array(10).fill(`unknown`),
  data: fetchData()
};

const userAnswered = (result) => {
  state.answers[state.position] = result;
  if (result === `wrong`) {
    state.lives--;
  }
  state.position++;
  if (state.lives > 0 && state.position < 10) {
    showScreen(`game`);
  } else {
    showScreen(`stats`);
  }

};


export default () => {
  // Определяем тип текущей игры, на основании количества картинок в текущем step
  let step = state.data[state.position];
  let game = games[`game` + step.size](state);

  // получаем HTML-элемент, на который будем дальше вешать eventListeners
  let template = getTemplate(`
    <p class="game__task">${game.task}</p>
    ${game.content}
    <div class="stats">
      <ul class="stats">
        ${state.answers.map((answer) => `<li class="stats__result stats__result--${answer}"></li>`).join(`\n`)}
      </ul>
    </div>
  `, `div`, [`game`]);

  // проставляем листенеры, в зависимости от типа игры
  game.action(template, userAnswered);

  // апдейтим хедер
  template.insertBefore(getHeader(state), template.firstChild);
  return template;
};
