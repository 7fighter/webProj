const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({   // 
    username: String,
    email: String, // unique: true, // if we need to make email unique
    password: String
    // ,age: Number, //if we need age 
    // ,gender: {type: String, enum:["male","female"]  // if  we restrict to two options
})

const usermodel = mongoose.model('User', userSchema); // model name(jis ka bna rahy us ka name) is User and schema is userSchema

module.exports = usermodel; // export the model so that we can use it in other files 
// exports = usermodel; //or other way is 