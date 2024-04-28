const app = require('./app'); // Require the Express app
const mongoose = require("mongoose");
const PORT = 3000;
// Start the server
app.listen(PORT, async () => {
  try {
    await mongoose.connect("mongodb+srv://Incredibles:Incredibles5@atlascluster.ep4ngpe.mongodb.net/Online-learning", {
    });
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
});
// mongodb+srv://Incredibles:Incredibles5@atlascluster.ep4ngpe.mongodb.net/