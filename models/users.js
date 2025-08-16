
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required: true,
    }
    
});

userSchema.plugin(passportLocalMongoose); // used this config to add username and password fields

module.exports = mongoose.model("User", userSchema);