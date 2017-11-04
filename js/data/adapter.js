const QuestionType = {
  'tinder-like': 1,
  'two-of-two': 2,
  'one-of-three': 3
};

export default (data) => {
  return data.map((question) => QuestionType[question.type]);
};
