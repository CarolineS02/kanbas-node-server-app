import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    quiz_question: { type: mongoose.Schema.Types.ObjectId, ref: "QuestionModel" },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" },
    answer: String,
    correct: Boolean,
  },
  { collection: "answers" }
);
export default schema;