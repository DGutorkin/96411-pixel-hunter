export default (answers, lives) => {
  if (answers.length === 10) {
    let score = answers.reduce((sum, answer) => {
      let scoreForThisAnswer = 0;
      if (answer.success) {
        if (answer.time < 10) {
          scoreForThisAnswer = 150;
        } else if (answer.time < 20) {
          scoreForThisAnswer = 100;
        } else if (answer.time < 30) {
          scoreForThisAnswer = 50;
        }
      }
      return sum + scoreForThisAnswer;
    }, 0);
    score += lives * 50;
    return score;
  }
  return -1;
};
