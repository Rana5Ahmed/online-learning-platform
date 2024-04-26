const User = require('../models/User');
const { userRegistrationSchema }  = require('../helpers/vaildation')
const Joi = require('joi');

const users = [
  new User(1,'Omar', 'password123'), 
  new User(2, 'Mohammed', 'securePassword') 
];

// Controller function to handle user registration
function registerUser(req, res) {
  // Validate request body using Joi schema
  const { error } = userRegistrationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // If the registeration is vaild then :
  else{
  const { username, password } = req.body;
  const isUsernameTaken = users.some((user) => user.username === username);
  if (isUsernameTaken) {
    // If the username is already taken, return an error response
    return res
      .status(400)
      .json({ message: 'Username already in use. Please choose another username.' });
  }

  // Create new instance to hold the data of new student
  const newUser = new User(users.length + 1, username, password);
  //Add the newUser to the Users array
  users.push(newUser);
  res.status(200).json({ message: 'User registered successfully' });
}
}

function getAllStudents (req, res){
// Get array of ALL users 
    res.status(200).json(users);
  }

module.exports = {
  registerUser,
  getAllStudents,
  // To be used in courseController to check in enrollment function 
  users,
};
