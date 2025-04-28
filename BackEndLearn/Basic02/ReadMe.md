sheriya backend dev video time 30min to 57min
# Now Let's start how we actually work in the industry
## Express package 



actaully used for production http is't used in production, it is external so let's install forst 
```cmd 
npm i express  
```
1. folder(nodemodule) and file(package-lock.json)should appear in the spcific folder where we have run this command 
2. you can verify expres from both nodule module and the package.json 

to use express import it and create its constructor 

```java 
const express = require("express"); //importing express
const app = express(); // creating an instance of express
```

# Routing in Express 

```js 
const express = require("express"); //importing express (import in java)
const app = express(); // creating an instance of express(constructor in java)


// routing starts from here
// To send from server to client
app.get("/", (req, res) => { //creating a route for the root URL bcz of "/"
    console.log(req.url);
    
  res.send("Base Page!"); //equals  to .end in http 
});

app.get("/about", (req, res) => {   // writing "/"" before about is important to make it a route
    console.log(req.url);

  res.send("About Page!");
});


app.get("/profilePage", (req, res) => {  // dont write like "/profile page" space between is invalid 
  res.send("Profile Page!"); 
});

app.listen(3000, () => { 
  console.log("Server is running on port 3000"); 
});

```


# Rendering html using Express

first we need a view engines, we will use `ejs` over here,
### Q: ejs is built-in or separtely need downloading 
- install ejs 
```cmd 
npm i ejs 
```
### Q: Do we require ejs 
- in the code, we don't need to require ejs as we are using it with expess so we will write 
```js 
app.set("view engine", "ejs"); //setting the view engine to ejs (embedded js) for rendering html pages
```

### Q: Does we need any folder, when using ejs as view engine
we require a folder in our app called named "views", the named views is not user define 

### Q: what type of files we have in views
 inside that we create `.ejs files`, .html file will not work, ejs files are similar to .html 

### Q: command for rendering html page through express at the specific route



```js 
  res.render("index"); 
```

complete code 
```js 
const express = require("express"); 
const app = express(); 

app.set("view engine", "ejs"); //setting the view engine to ejs (embedded js) for rendering html pages

// .get:  To send from server to client
app.get("/", (req, res) => { 
  res.render("index");  // for rendering 
});

```
### Q: changes made in ejs will directly shown without the refreshing the web page 
no, we have to refresh page it does not depends upon the nodemon 


# MiddleWares 

suppose a scenario where we want that every request that is coming to the index route first pass through a certain function, before it reaches that route.these middle function are called middlewares

```js 
app.use((req,res,next) =>{ // .use of exprress and note it has three parameters inside an arrow function
  console.log("this is a middleWare ");
})

```
`note` this middleWare will run before everysingle route. and the loading of the browser will keep on hapening bcz we just sending a message on the console and doesnot send anything to be viewd on the browser 

if write it as then no loading happens

```js 
app.use((req,res,next) =>{ 
  console.log("this is a middleWare ");
  res.send("midlle ware")  // stops loading in the browser (round loading circle near url)
})

```
but here we just send `errors` and other then that we return next at the end this next points to the thing that we wants to do next 

```js 
app.use((req,res,next) =>{ 
  // logic we want to be processed in middle ware 

  const a =3 ;
  const b = 4 ;            // error code can be returned from here
  console.log(a+b);
  

  return next();
 
})
```
above is an custom middleware

## type of middleware
  1. custom middleware 
  2. built in middle ware (no need to install)
  3. third part middle ware (first install then require and use)
`note` all the middle by default runs for all the routes
   
## Morgan (third part middleware)

first install it trough npmjs.com, it is logger
```cmd
npm i morgan
```
on the console it tells us the information like `method`, `reponsecode` , `timetaken to send response` and the `route` 
```cmd
//output on cmd 
GET /about 304 3.542 ms - -
```

### Q: how to make a middle ware for only one route 

```js
//normall get
app.get("/", (req,res)=>{}) // basically it is like app.get("route", mainFunctionforthisroute(req,res))

// but for custome middleware the defination become 
app.get("/",(req,res,return)=>{}, (req,res)=>{})   // app.get("route", middlewareFunction,mainFunctionforthisroute)
```

```js
//custom middleware
app.get("/",
  (req,res,next) =>{  
  console.log("Custom middleware for / route"); //mcustommidlewaere code
  next(); 
}, 
(req, res) => { 
  res.render("index");  // mainfunction code
});

```