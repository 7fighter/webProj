1:58
### Q: How to short the command for running through the cmd
```json
    "start": "node index.js"
```
now on the console just write `npm start` and app will start working properly
`note` enter the above code under the packagr.json file in the script tag

# Q: Don't write all routes under the App.js
if we look previous code then with some routes our code has beome complecated now we are making a separate `folder` named `routes` and this folder we will create different files as per our requirments like under userRoutes.js etc 

```js
//folder is routes/userRoutes
const express = require('express');
const router  = express.Router(); // insted of app we will use router

router.get("/test", (req, res) => {
    res.send("<h1>test route from the routes folder</h1>");  
});


module.exports = router; // exporting the router so we can use it in app.js file
```
code inside the app.js will be 

```js 
//app.js
const express = require('express');
const app = express(); 
const UserRoutes = require("./routes/userRoutes"); // import the user routes
app.use("/user", UserRoutes);  // using the user routes
app.listen(3000);

```

`note`  
```cmd
http://localhost:3000/user/test
```
you have to write this on the browser to succesfully target test route, means routenameinApp.js/actuallRouteInTheRoutesFolder

`note` prefer writing like bcz api reprent that it is backend response told by awais. backend error are shown in the vs cmd terminal wher front end problems are shown in the broserConsole 
```js
app.use("/Api/user", userRoutes);
```
for targetting this route we wrrite this url in the chrome
```cmd
http://localhost:3000/Api/user/test
```

```js
app.use("/user", UserRoutes);//this one line in app.js is inoff to use all the routes are written in the userRoutesfile
```

### Q: does creating a routes folder effects the `form route` for sending data to the server  
yes obviously, now to hit that post route we have 
```js 
/user/siginup  //bcz siginup post route is in the userRoutes and the name that is used in the app.js is "user" whichis represting all userRoutes
```
## tailwind and flowbite
include boths cdn's near the end of head tag and one script tag cdn of flow bite should be included near the body tag end. waht flow byte does it provide us the built in components for our app.it will look for the dark and white theme and do maintain the code for different devices `note` in the form include the route and name bcz by yourself 

# validating the data whether it is valid or not 
`expressValidator` validates the data for us 
```js 
// userRoutes
const { body } = require('express-validator');

```
```js  
//userrouter
router.post("/siginup",                  //middleware for validation
    body("email").trim().isEmail(), 
    body("password").trim().isLength({min:5}),
    body("username").trim().isLength({min:3}), 
    async(req, res) => {

        const errors = validationResult(req); // checking for errors in the data
        console.log(errors); 
        console.log(req.body);
        res.send(errors); 
            
});

```

# Correct way of coneecting with database (config folder)
1. we bult a function called connectToDb
2. url is not written directly we write it inside the `.env` file  
    dont push it to the git bcz of `security`  AAll secrets are inside this.before we use .env we need to 
    install 
    ```cmd
    npm i dotenv
    ```  
    and then inside the App.js 
    ```js
    //App.js
    const dotenv = require('dotenv'); // import the dotenv
    dotenv.config(); // load the environment variables from .env file
    ```
    ### Q: how to use .env in our code 
    ```js 
    // using mongodburl in the db.js
    const mongoose = require('mongoose'); 
    function connectToDB() {
    mongoose.commect(process.env.MONGO_URI, {
         
    })
    module.exports = connectToDB; 
    ```
    `note` indse the .env dont give the space before and after the `=` it casuse the error 
    ### code for connecting the db inside the app.js 
    ```js 
      const connectToDB = require("./config/db") // import the db connection
      connectToDB(); // calling db.js fnctio
    ```
    ### Q how we prevent the files to get uploaded in the github 
    make a file name `.gitignore` inside this file write the names of file which we want to prevent

### Q previously we simpliy import of our userschema inside the app.js and simply use in the scehema in the route to send data what to do here
Now here rotes/userRoutes has the the implemention for when to user the post route to create an instance in db then how we will do that work here
1. require the usermodel in the userRoute 


`installing bcrypt`

```cmd
npm i bcrypt
```

```js 
const hashpassword = await  bcrypt.hash(password, 10);

//under the loginpost route  
const isMatch = await bcrypt.compare(password, user.password); // comparing the password with the hashed password

```
### Q What does 10 in the .hash parameter shows 
we hash for the frist time get a value then we again hash it similarly we do this for 10 time 

# connecting online mongodb 
1. download the extenson mongodb for vscode 
2. command platte and eter connect: to mongod  (avaliable nder the connect in the mongodb web )
3. then enter the url achieved through mongo db web 
4. left side their is a leave of mongo click on it and goto the test your your data is under this test

# for the cookies 
## json web token 
```js
npm i jsonwebtoken
```
require jeon web token jwt 
person login for one and onward that we give that person the capability to do tasks
```js
//int the routes
const jwt = require('jsonwebtoken'); // for creating the token

//inside the postlogin code 
//fisrst parameter is an object second is an jwtsecret 

const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

```
`note` jwtsecret get stored in the .env 

## for cookies 
```js 
npm i cookie-parser
```
set the cookies parser inside the app.js file 

```js
// insde app.js
const cookieParser = require('cookie-parser'); // for parsing the cookies
app.set(cookieParser()); // for parsing the cookies
```
```js
//insde the userRoutes
//under the jwt
res.cookies("token", token) //one is name and other is value of the token
```
### Q how to seee the cookies in on the console 
1. in teh browser right click and inspect 
2. now in the top ribbon click >> and select Application
3. now you will find the option for cookies on the left side


# making the home page 
home routes will be in the index.routes 
1. enctype="multipart/form-data"   in the form 
2. name = "file"  in the input tag 


# supabase
1. create project---> create bucket , note the name of bucket will be used in the future for sending data to our storage
2. i dont have founded 3:15 secure file that a person has downloaded in the supabase. here{in supabase} things are clear and easy two links under the connect--->javaApplication---> nodejs  button we will be given these are the main keys that will connects us to the our application
3. under the project we got sqleditor really usefully for the manipulating table if facing error 403(Rls of table)
### conculsion 
userroutes and uploading routes separtely not gona write in the single app.js and user authentcation

### tip 
- all the middle ware must be called in the app.js 
if chrome keeps on reloading then their is a possibility that you might have missed done any sytax mistake like forget to put function end bracket etc 