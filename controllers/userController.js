const {users} = require('../models/User');
const { userRegistrationSchema }  = require('../helpers/vaildation')
const Joi = require('joi');
const { courses } = require('../models/Course');





// handle user registration
    async function registerUser(req, res) {
      try {
        // Validate request body using Joi schema
        const { error } = userRegistrationSchema.validate(req.body);
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }

        const { username, password ,userId } = req.body;

        // Check if the username already exists
        // search for a user document where the username field matches the username value obtained from the request body 
        const existingUser = await users.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ message: 'Username already in use. Please choose another username.' });
        }
            // Check if the password already exists
            // search for a user document where the password field matches the password value obtained from the request body 
            // May be commented because of security issue
        const existingpassword = await users.findOne({ password });
        if (existingpassword) {
          return res.status(400).json({ message: 'password already in use. Please choose another password.' });
        }
    // Check if the Id already exists
        const existingId = await users.findOne({ userId });
        if (existingId) {
          return res.status(400).json({ message: 'Id is wrong , Enter your Id' });
        }

        // Create an instance from users model
        const newUser = new users({username, password,userId});
        // Save to the database(mongodb)
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', users: newUser });
      } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
      }
    }

    async function deleteuser(req, res) {
      try {    
        const { user_Id, password } = req.body; 
      const backup_user = await users.findById(user_Id);
  
    if (!backup_user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (backup_user.password !== password) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const deletedUser = await courses.updateMany(
      { students: { $in: [user_Id] } },
      { $pull: { students: user_Id } },
    );
    
      res.status(200).json({ message: 'User deleted successfully', deletedUser });
    }
       catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
      }
    }

async function getAllStudents(req, res) {
  try {
    // Fetch all users from the database
    const allUsers = await users.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
}
module.exports = {
  registerUser,
  getAllStudents,
  deleteuser,
  // To be used in courseController to check in enrollment function 
  users,
};



    // const user = await users.deleteOne({ _id: req.body.user_Id }); 
          // const updatedCourses = await courses.updateMany(
            // { students: user._id }, // Find courses where the user's ID exists in 'students' array
            // { isDeleted: true }  // Remove the user's ID from 'students' array
          // );