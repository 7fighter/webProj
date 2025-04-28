const express = require("express"); //importing express (import in java)
const app = express(); // creating an instance of express(constructor in java)
const morgan = require("morgan"); 

app.set("view engine", "ejs"); //setting the view engine to ejs (embedded js) for rendering html pages

//middleware
app.use(morgan("dev")); //tells what req has camed to your server
app.use((req,res,next) =>{ 

  // logic we want to be processed in middleware 
  const a = 3 ;
  const b = 4;
  console.log(a+b);
  
  return next();  //this next is IMP it trigger next thing  
  //return next() == next() 
 
})

//custom middleware
app.get("/",
  (req,res,next) =>{  
  console.log("Custom middleware for / route"); //mcustommidlewaere code
  next(); 
}, 
(req, res) => { 
  res.render("index");  // mainfunction code
});

app.get("/about", (req, res) => {   
    res.render("about"); 
});


app.get("/profilePage", (req, res) => {  // dont write like "/profile page" space between is invalid 
  res.send("Profile Page!"); 
});

app.listen(3000, () => { 
  console.log("Server is running on port 3000"); 
});