const mongoose=require('mongoose');
const { users } = require('./User');

const courseSchema= new mongoose.Schema({
id:{type: Number,required:true},
name:{type:String,required:true},
description:{type:String,required:true,},
students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
})


// Method to enroll a student in the course
  courseSchema.methods.enrollStudent = async function(user) {
      try {
        const exist = this.students.some(student => student._id === user._id);
     if(exist){
      return res.status(404).json({ message: 'User is already in that course' });


     } 

        
        // Push userId into students array
        this.students.push(user);
        // Save the updated course document
        await this.save();
        return true; // Enrollment successful
      } catch (error) {
        console.error('Error enrolling student:', error);
        throw error;
      }
    };
    const courses = mongoose.model('courses',courseSchema)
  // Exporting the Course class to make it accessible from other modules
  module.exports = {
    courses,
  }
  