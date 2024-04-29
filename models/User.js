
const mongoose=require('mongoose');
const userSchema= new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId:{type :Number, required:true},
})

const users = mongoose.model('users',userSchema)

  //availability of using in other modules
  module.exports = {
    users,
  }
  