// Importing the Course model
const Course = require('../models/Course');
const Joi = require('joi');
const { courseCreationSchema } = require('../helpers/vaildation');
const { users } = require('./userController');
const courses = [
  new Course(1, 'JavaScript Fundamentals', 'Learn the basics of JavaScript programming'), 
  new Course(2, 'Web Development Bootcamp', 'Master the essentials of web development') 
];

function createCourse(req, res) {
  // Validation 
  const { error } = courseCreationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });}
  else
{
  // Extracting name and description from the request body
  const { name, description } = req.body;
  // Creating a new Course instance with an incremented ID
  const newCourse = new Course(courses.length + 1, name, description);
  courses.push(newCourse);
  res.status(201).json({ message: 'Course created successfully' });
}
}

function getAllCourses(req, res) {
  res.status(200).json(courses);
}

function enrollCourse(req, res) {
// Extracting course ID and user ID from request parameters and body (The course ID will be in the request and you put the userId in the body)
  const courseId = parseInt(req.params.id);
  const userId = parseInt(req.body.userId);
  // Make sure that course and student ID are exist 
  const course = courses.find(course => course.id === courseId);
  const found_user= users.find(user => user.id === userId);
  // IF NOT --> Error
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }   
  else if (!found_user) {
    return res.status(404).json({ message: 'User not found' });
  }
    else{
  course.enrollStudent(userId);
  res.status(200).json({ message: 'User enrolled in course successfully' });
}
}
module.exports = {
  createCourse,
  enrollCourse,
  getAllCourses,
};
