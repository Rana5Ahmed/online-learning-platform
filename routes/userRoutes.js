const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Defining a route to handle user registration
// Whenever there is a request includes (/register) then the middelware userController(registerUser function inside it) will be executed 
router.post('/register', userController.registerUser);

router.get('/', userController.getAllStudents);

module.exports = router;
