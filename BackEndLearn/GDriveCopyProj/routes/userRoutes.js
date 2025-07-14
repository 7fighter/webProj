const express = require('express');
const router  = express.Router(); // insted of app we will use router
const userModel = require('../models/user.model'); // first dot is for going to the parent directory and then going to the models folder and then user.model.js file
const bcrypt = require('bcrypt'); // for hashing the password
const jwt = require('jsonwebtoken'); // for creating the token


const { body, validationResult } = require('express-validator'); // expressvalidatot


//examplery route for testing purpose
router.get("/test", (req, res) => {
    res.send("<h1>test route from the routes folder</h1>");  
});

// this siginup route for showing the page
router.get("/siginup",(req, res) => {
    res.render("siginup");  
});

// this is the post route for getting the data from the form
router.post("/siginup",                  //express validation
    body("email").trim().isEmail(), 
    body("password").trim().isLength({min:5}),
    body("username").trim().isLength({min:3}), 
    async (req, res) => {
        //chechking if their is any error in the data
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array(),
                message: "invalid data"
            });
        }
        //if no error then we will create the user
        const {username,email,password} = req.body; 
        //hashing the password

        const hashpassword = await  bcrypt.hash(password, 10); // 10 is the salt rounds
       
            const newuser = await userModel.create({
                username :username,  
                email:email,
                password :hashpassword}) 

            res.send(newuser); // send the new user data on the web page
        res.json(newuser);


});


//login route for showing the page
router.get("/login", (req, res) => {
    res.render("login");  
});

//login post route for sending the data to the database
router.post("/login",
    body("email").trim().isEmail().isLength({min:13}), 
    body("password").trim().isLength({min:5}),
    async (req, res) => {
        //chechking if their is any error in the data
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array(),
                message: "invalid data"
            });
        }
        //if no error then we will create the user
        const {email,password} = req.body; 
        //hashing the password

        const user = await userModel.findOne({email}); // finding the user by email
        if(!user){
            return res.status(400).json({
                message: "eamil or password incorrect"
            });
        }
       
        const isMatch = await bcrypt.compare(password, user.password); // comparing the password with the hashed password
        //crun this if password does not match
        if(!isMatch){
            return res.status(400).json({
                message: "user name or  password incorrect"
            });
        }
        

        //jwt
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
         // creating the token
         res.cookie("token", token) //one is name and other is value of the token
        res.send("logged in successfully"); 
    }
)
        


module.exports = router; // exporting the router so we can use it in app.js file

