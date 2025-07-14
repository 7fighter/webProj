const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true, 
        lowercase: true, 
        minLength: [3,"username must be at least 3 characters long"], //if len is smal then dsplay this message
        maxLength: 20, 
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
        lowercase: true,
        minLength:[13,"email must be at least 13 characters long"], 

    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: [5,"password must be at least 5 characters long"], 

    },
}, {timestamps:true

}); // timestamps will add createdAt and updatedAt fields to the schema


const usermodel = mongoose.model('User', userSchema); // model name(jis ka bna rahy us ka name) is User and schema is userSchema

module.exports = usermodel; // export the model so that we can use it in other files 
// exports = usermodel; //or other way is 