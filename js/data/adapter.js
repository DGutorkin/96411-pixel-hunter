const QuestionType = {
  'tinder-like': 1,
  'two-of-two': 2,
  'one-of-three': 3
};

export default (data) => {
  data.forEach((question) => {
    question._type = QuestionType[question.type];
    question.answers.forEach((answer) => {
      answer.type = answer.type === `painting` ? `paint` : `photo`;
    });
  });
  return data;
};
