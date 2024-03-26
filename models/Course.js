class Course {
    // Constructor function to initialize a new Course instance
    constructor(id, name, description) {
      this.id = id;
      this.name = name;
      this.description = description;
      // To hold the ID's of students that is exist in that course
      this.students = [];
    }
  
    // Method to enroll a student in the course
    enrollStudent(userId) {
      // Pushing the user ID into the array of enrolled students
      this.students.push(userId);
    }
  
  }
  
  // Exporting the Course class to make it accessible from other modules
  module.exports = Course;
  