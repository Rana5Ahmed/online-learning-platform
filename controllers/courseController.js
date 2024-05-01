// Importing the Course model
const { courses} = require('../models/Course');
const Joi = require('joi');
const { courseCreationSchema } = require('../helpers/vaildation');
const { users } = require('./userController');


async function createCourse(req, res) {
  try {
    const { error } = courseCreationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { id,name, description} = req.body;
    const existingid = await courses.findOne({ id });
    if (existingid) {
      return res.status(400).json({ message: 'Course is already exist,Enroll now to it !!' });
    }
    const existingCourse = await courses.findOne({ name });
    if (existingCourse) {
      return res.status(400).json({ message: 'Course is already exist,Enroll now to it !!' });
    }
   const newCourse = await courses.create({ id, name, description });
    res.status(201).json({ message: 'Course created successfully', courses: newCourse });
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
}


async function deleteCourse  (req, res) {
  try {
      const course = await courses.deleteOne({ _id: req.body.course_id });
      res.status(200).json({message: 'Course Deleted successfully',course});
  } catch (error) {
      res.status(400).send(error);
  }
}



async function enrollCourse(req, res) {
  try {
    const courseId_id = req.params.id;
    const user_id = req.body.user_Id;
    const course = await courses.findById(courseId_id);
    const user = await users.findById(user_id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assuming you have a method like `enrollStudent` in your Course model
  
    const checking = course.students.includes(user_id);
    if (checking){
      return res.status(404).json({ message: 'User is already in that course' });
    }
    else{
    course.students.addToSet(user_id)
    }
    await course.save();
    res.status(200).json({ message: 'User enrolled in course successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error enrolling user in course', error: error.message });
  }
}
async function getAllCourses(req, res) {
  try {
    const allCourses = await courses.find({});
    res.status(200).json(allCourses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
}

module.exports = {
  createCourse,
  enrollCourse,
  getAllCourses,
  deleteCourse,
  };
