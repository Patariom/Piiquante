//Import Mongoose
const mongoose = require("mongoose");

//Import Unique Validator to ensure unique emails in database
const uniqueValidator = require('mongoose-unique-validator');

//Create UserSchema with Mongoose
const userSchema = mongoose.Schema({
    email : {type:String, required:true, unique:true },
    password: {type:String, required:true},
})

//Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

//Export the Schema
module.exports = mongoose.model("User", userSchema);

