const Joi = require('joi');


// Validation schema for user registration
const userRegistrationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
 // Password should be consisting of alphanumeric characters, with minimum 3 and maximum 30 characters
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});



// Validation schema for course creation
const courseCreationSchema = Joi.object({
  name: Joi.string().max(20).required(),
  description: Joi.string().required(),
});

module.exports = {
  userRegistrationSchema,
  courseCreationSchema,
};
