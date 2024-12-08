import model from "./model.js";
import mongoose from "mongoose";

export function findAllAnswers() {
  return model.find();
}

export function findAnswersForQuiz(quizId, userId, attempt) {
  return model.find({ quiz: quizId, user: userId, attempt: attempt });
}

export async function findLatestAnswersForQuiz(quizId, userId) {
  console.log(`quizId: ${quizId}. userId: ${userId}`);
  return await model.aggregate([
    // Match the documents to only use the given quizId and userId
    {
      $match: {
        // Convert id to ObjectId (needed for $match)
        quiz: mongoose.Types.ObjectId.createFromHexString(quizId),
        user: mongoose.Types.ObjectId.createFromHexString(userId),
      },
    },
    // Group and get the max attempt number
    {
      $group: {
        _id: { quiz_question: "$quiz_question", user: "$user" },
        greatestAttempt: { $max: "$attempt" },
      },
    },
    // Lookup documents that match the greatest attempt for each group
    {
      $lookup: {
        from: "answers",
        let: {
          quiz_question: "$_id.quiz_question",
          user: "$_id.user",
          greatestAttempt: "$greatestAttempt",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$quiz_question", "$$quiz_question"] },
                  { $eq: ["$user", "$$user"] },
                  { $eq: ["$attempt", "$$greatestAttempt"] },
                ],
              },
            },
          },
        ],
        as: "latestAnswers",
      },
    },
    // Flatten the array of matched answers (the result will be an array of answers)
    {
      $unwind: "$latestAnswers",
    },
    // Project fields to return
    {
      $project: {
        _id: "$latestAnswers._id",
        quiz_question: "$latestAnswers.quiz_question",
        quiz: "$latestAnswers.quiz",
        user: "$latestAnswers.user",
        attempt: "$latestAnswers.attempt",
        answer: "$latestAnswers.answer",
        correct: "$latestAnswers.correct",
        time_started: "$latestAnswers.time_started",
        sequence: "$latestAnswers.sequence",
      },
    },
  ]);
}

export function findAnswerById(answerId) {
  return model.find({ _id: answerId });
}

export function createAnswer(answer) {
  delete answer._id;
  return model.create(answer);
}

export function deleteAnswer(answerId) {
  return model.deleteOne({ _id: answerId });
}

export function updateAnswer(answerId, answerUpdates) {
  return model.findByIdAndUpdate({ _id: answerId }, answerUpdates, {
    new: true,
  });
}
