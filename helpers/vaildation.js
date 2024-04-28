  const Joi = require('joi');


  // Validation schema for user registration
  const userRegistrationSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
  // Password should be consisting of alphanumeric characters, with minimum 3 and maximum 30 characters
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    userId:Joi.number().integer().min(1).required()

  });



  // Validation schema for course creation
  const courseCreationSchema = Joi.object({
    name: Joi.string().max(30).required(),
    description: Joi.string().required(),
    id:Joi.number().integer().min(1).required()
  });

  module.exports = {
    userRegistrationSchema,
    courseCreationSchema,
  };
