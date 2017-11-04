const SERVER_URL = `https://es.dump.academy/pixel-hunter`;

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`)
        .then((res) => res.json());
  }
}
