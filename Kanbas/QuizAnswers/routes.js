import * as dao from "./dao.js";
import * as answersDao from "../QuizAnswers/dao.js";

export default function QuestionsRoute(app) {
  app.put("/api/answers/:answerId", async (req, res) => {
    const { answerId } = req.params;
    const answerUpdates = req.body;
    delete answerUpdates._id;
    const updatedAnswer = await answersDao.updateAnswer(
      answerId,
      answerUpdates
    );
    res.status(204).send(updatedAnswer);
  });

  app.delete("/api/answers/:answerId", async (req, res) => {
    const { answerId } = req.params;
    await answersDao.deleteAnswer(answerId);
    res.sendStatus(204);
  });

  app.post("/api/answers", async (req, res) => {
    const answer = req.body;
    const found = await answersDao.findAnswerById(answer._id);
    let ans;
    if (answer._id && found) {
      ans = await answersDao.updateAnswer(answer._id, answer);
    } else {
      ans = await answersDao.createAnswer(answer);
    }
    res.send(ans);
  });

  app.post("/api/quizzes/:quizId/answers", async (req, res) => {
    const { quizId } = req.params;
    const answer = {
      ...req.body,
      course: quizId,
    };
    const newAnswer = await answersDao.createAnswer(answer);
    res.send(newAnswer);
  });

  app.get("/api/answers/:quizId/:userId/:attempt", async (req, res) => {
    const { quizId, userId, attempt } = req.params;
    const answers = await answersDao.findAnswersForQuiz(
      quizId,
      userId,
      attempt
    );
    res.json(answers);
  });
}
