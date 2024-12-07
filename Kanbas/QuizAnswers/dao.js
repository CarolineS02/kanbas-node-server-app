import model from "./model.js";

export function findAllAnswers() {
  return model.find()
}

export function findAnswersForQuiz(quizId, userId, attempt) {
  return model.find({ quiz: quizId, user: userId, attempt: attempt });
}

export function createAnswer(answer) {
  delete answer._id
  return model.create(answer);
}

export function deleteAnswer(answerId) {
  return model.deleteOne({ _id: answerId });
}

export function updateAnswer(answerId, answerUpdates) {
  return model.findByIdAndUpdate({ _id: answerId }, answerUpdates, { new: true });
}

