import * as dao from "./dao.js";
import * as answersDao from "../QuizAnswers/dao.js";

export default function QuestionsRoute(app) {
    app.put("/api/answers/:answerId", async (req, res) => {
        const { answerId } = req.params;
        const answerUpdates = req.body;
        delete answerUpdates._id
        const updatedAnswer = await answersDao.updateAnswer(answerId, answerUpdates);
        res.status(204).send(updatedAnswer);
    });

    app.delete("/api/answers/:answerId", async (req, res) => {
        const { answerId } = req.params;
        await answersDao.deleteAnswer(answerId);
        res.sendStatus(204);
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

    app.get("/api/quizzes/:quizId/answers", async (req, res) => {
        const { quizId } = req.params;
        const answers = await answersDao.findAnswersForQuiz(quizId);
        res.json(answers);
    });

}

