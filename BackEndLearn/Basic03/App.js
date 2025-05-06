const express = require('express');
const app = express(); 
const morgan = require('morgan');

app.set("view engine", "ejs");

app.use(morgan("dev")); 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public")); // use to connect static files like css and js

app.get("/", (req, res) => {
    res.render("siginup");  
});

//post sends data to the server 
app.post("/getFormData", (req, res) => {
    console.log(req.body); // output the data in the console (not a professional)
    res.send("Form data received!");   //to protect from loading 
});

app.get("/login", (req, res) => {
    res.render("login");  
});



app.listen(3000);