const mongoose=require('mongoose');

const courseSchema= new mongoose.Schema({
id:{type: Number,required:true},
name:{type:String,required:true},
description:{type:String,required:true,},
students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
})
const courses = mongoose.model('courses',courseSchema)
  // Exporting the Course class to make it accessible from other modules
  module.exports = {
    courses,
  }
  