import * as dao from "./dao.js";
import * as quizzesDao from "../Quizzes/dao.js";

export default function QuizzesRoutes(app) {
    app.put("/api/quizzes/:quizId", (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        quizzesDao.updateQuiz(quizId, quizUpdates);
        res.sendStatus(204);
    });

    app.delete("/api/quizzes/:quizId", (req, res) => {
        const { quizId } = req.params;
        quizzesDao.deleteQuiz(quizId);
        res.sendStatus(204);
    });

}

