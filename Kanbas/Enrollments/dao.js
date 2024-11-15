import Database from "../Database/index.js";

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  Database.enrollments = [...enrollments, { _id: Date.now(), user: userId, course: courseId }];
  return Database.enrollments;
}

export function unenrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    (enrollment) => !(enrollment.course === courseId && enrollment.user === userId)
  );
  return Database.enrollments;
}

export function findAllEnrollments() {
  return Database.enrollments;
}
