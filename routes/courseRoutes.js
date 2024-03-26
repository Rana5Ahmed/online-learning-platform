const express = require('express');
const courseController = require('../controllers/courseController');
const router = express.Router();

router.post('/', courseController.createCourse);
router.post('/:id/enroll', courseController.enrollCourse);
router.get('/', courseController.getAllCourses);
module.exports = router;
