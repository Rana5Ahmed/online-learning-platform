// Including all Required modules  
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');

// Creating an instance or object  of the Express application
const app = express();
const PORT = 3000;
app.use(express.json()); 

// Mounting the user routes at the '/users' endpoint and the course routes at the '/courses' endpoint 
// (means when ever there is any path includes /users the middelware userRoutes will be executed)
app.use('/users', userRoutes);
app.use('/courses', courseRoutes);

// To make sure that code is working or not
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});