// setup the connection with the Actuall database 

const mongoose = require('mongoose'); 

const connection = mongoose.connect("mongodb://0.0.0.0/WEBDEV").then(() => {  // coennecting to localhost  (so 0.0.0.0 )of mongodb and at the end we have given our folder name
    console.log("MongoDB connected...");
});// web dev ka name ki aik databse compass main a jy gyi

//let's export it
module.exports = connection;