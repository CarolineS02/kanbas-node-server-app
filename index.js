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
mongoose.connect(CONNECTION_STRING);
console.log('NODE_SERVER_DOMAIN:', process.env.NODE_SERVER_DOMAIN);

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
app.use((req, res, next) => {
    req.session.save((err) => {
        if (err) console.error('Session save error:', err);
        else console.log('Session saved successfully:', req.session);
    });
    next();
});
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
