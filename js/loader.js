const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
const DEFAULT_NAME = `default`;

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`)
        .then((res) => res.json());
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${SERVER_URL}/stats/${name}`)
        .then((res) => res.json())
        .catch(() => {});
  }

  static saveResults(history, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(history),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${name}`, requestSettings);
  }
}
