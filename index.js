import express from 'express';
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js"
import session from "express-session";
import "dotenv/config";
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import QuizRoutes from "./Kanbas/Quizzes/routes.js"
import mongoose from "mongoose";
import "dotenv/config";
import QuestionsRoute from './Kanbas/QuizQuestions/routes.js';

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
// const CONNECTION_STRING = "mongodb+srv://southardsmithc:8zDrksHQlU9yx39v@db-cs4530-f24-109.zwh8f.mongodb.net/kanbas"
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:3000",
        // origin: "http://localhost:3000",
    })
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none", //was lax -none
        secure: true, //was false -true
        // domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));
app.use(express.json());
// Code to test and display session variables for Render:
// app.use((req, res, next) => {
//     req.session.save((err) => {
//         if (err) console.error('Session save error:', err);
//         else console.log('Session saved successfully:', req.session);
//     });
//     next();
// });
UserRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
ModuleRoutes(app);
QuizRoutes(app);
QuestionsRoute(app);
Lab5(app);
Hello(app)
app.listen(process.env.PORT || 4000);
