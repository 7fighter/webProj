const express = require('express');
const app = express(); 
const morgan = require('morgan');
const userModel = require('./models/user'); // import the user model
const dbConnection = require("./config/db") // import the db connection

app.set("view engine", "ejs");

app.use(morgan("dev")); 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public")); 


app.get("/", (req, res) => {
    res.send("<h1>Welcome to the home page</h1>");  
});
// this siginup route for showing the page 
app.get("/siginup", (req, res) => {
    res.render("siginup");  
});

// this is the post route for getting the data from the form
app.post("/siginup", async(req, res) => {
    const {username,email,password} = req.body; // destructuring the data

    const newuser = await userModel.create({
        username :username,  
        email:email,
        password :password}) 

        res.send(newuser); // send the new user data on the web page
    
});

// Readin the data from the database 
app.get("/get-users", (req,res) =>{
    userModel.find(
        {
            password: "abc" // filtering users 
        }
    ).then((users)=>{   
        res.send(users)  // send the users data to the web page
    })
});

// finding and updating 
app.get("/update-users", async (req,res) =>{
    await userModel.findOneAndUpdate(
        {
            password: "a" // filtering users 
        },
        {
            password: "x" // updating the password 
        },
        { new: true }  //bcz of this updating user will be shown on console 
    ).then((users)=>{   
        res.send(users)  // send the users data to the web page
    })
});

//delting user 
app.get("/delete-users", async (req,res) =>{
    await userModel.findOneAndDelete(
        {
            password: "a" // filtering users 
        },
        // { new: true }  
    ).then((users)=>{   
        res.send(users)  // send the users data to the web page
    })
});

app.post("/getFormData", (req, res) => {
    console.log(req.body); 
    res.send("Form data received!");   
});

app.get("/login", (req, res) => {
    res.render("login");  
});



app.listen(3000);