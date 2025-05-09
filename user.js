const mongoose = require('mongoose');

// Define the schema for a "Book"
const userSchema = new mongoose.Schema({
   name:String,
  username:String,
  email:String,
  password:String,
})
const user=mongoose.model("user",userSchema);
module.exports=user;