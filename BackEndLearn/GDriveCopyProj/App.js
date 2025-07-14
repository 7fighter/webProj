const express = require('express');
const app = express(); 
const morgan = require('morgan');
// const userModel = require('./models/user.model'); // off chechk bcz now in router 
const connectToDB = require("./config/db") // import the db connection
const userRoutes = require("./routes/userRoutes"); // import the user routes
const dotenv = require('dotenv'); // import the dotenv
dotenv.config(); //makes the env variables available in the app
const cookieParser = require('cookie-parser'); // for parsing the cookies
const indexRouter = require("./routes/index.router"); 



connectToDB(); // calliing db.js function

app.set("view engine", "ejs");
app.set(cookieParser()); // for parsing the cookies

app.use(morgan("dev")); 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public")); 


app.use("/user", userRoutes);  // using the user routes
// app.use("/user", userRoutes);  // no need to write like ths the above middleware is inoff for accessing the user route 
app.use("/", indexRouter); 




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




app.listen(3000);