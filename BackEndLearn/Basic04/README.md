1:15 and 
# Mongodb

two software got downloaded monogodb community version and second is compass, compass is similar to the mysqlworkbench that we use for the visusalization purposes and here we will use the `localhost:27017`

inside our app package we need to install `mogoose`
```cmd 
npm i mongooose
```

### Q is their any specific folder that we need to create [ this is the folder for the models]
yes we need to create a folder named `models` and inside this we define in the schema in .js file

`schema` defines what are the basic attributes which a specific thing whoose schema is being built must have  

let's built a schema for the user. `note` it is in the model folder 
supoose you have a user.js in folder and the code inside it is like 

```js 
const mongoose = require(mongoose); //importing moongoose
const userSchema = new mongoose.Schema({ // .schmea is a function that takes object as parameter
})
```
suppose building for the siginup then it will be like 

```js
const userSchema = new mongoose.Schema({   // 
    username: String,
    email: String,
    password: String
    // ,age: Number, //if we need age 
    // ,gender: {type: String, enum:["male","female"]  // if  we restrict to two options
})
```
to actually implement it the database this prompt is require and this prompt is equals to the create table [ki body ka andr jis jaga attributes dyta] of mysql, now it is not implement nted but it can't be implemented without this line

#### Q why is it not implemented over here
bcz we have't connected with the database right now 
```js
const usermodel = mongoose.model('User', userSchema); //jis ka bna rahy or jis sy bna rahy
```
`note` .schema or .model dono mil kr create table ki complete query bna dyta hain
### Q how to connect our model with the app.js 
#### is their any folder require for db connection ??
first do `export` and then `require` in app.js
```js
// in the model folder doing export
module.exports = usermodel; // export the model so that we can use it in other files 
//or other way is 
exports = usermodel; 
```
```js 
//in app.js 
const usermodel = require('./models/user'); // import the user model
```

### Benefits of user model

we can perfom the basic crud operation through it. create, read delete and upate 


# Connecting with database
1. create a folder named `confiq` and 
2. in the folder create a file named `db.js`

```js 
//code in config/db.js folder 
//require mongoose

mongoose.connect("mongodb://0.0.0.0/WEBDEV").then(() => {
    console.log("MongoDB connected...");  // web dev ka name ki database ban jy gyi
    // then export 
});
```
it also return the value of connection it made so lets store it  in the variable 

```js 
const connection = mongoose.connect("mongodb://0.0.0.0/WEBDEV").then(() => {
    console.log("MongoDB connected...");
});

```

### Q how the data base will be created in the mongo db 

through the code of db.js an db will be created in the mongo. you can verify by refreshing the compass to refresh do ctrl+r or cmd+r 
`note` when you open it you will see a collection of name user. and this is initally empty bcz we have't created a user yet

# now lets insert the data into the user collection of webDev database
1. first take data from the user 
2. bring that data to the server and the create an instance(row) in the collection
   for step 2 
   ```js 
    //getfromdata ka route ko thora modify kr lyn ga
    app.post("/siginup", (req, res) => {
    const {username,email,password} = req.body; // destructuring the data
    res.send("user register")

    // creating a an intance, record, row of usermodel
    userModel.create({
        username :username,   //usernamae of schema = destructuring ka username
        email:email,
        password :password}) 
    
    });

    res.end("user register")
   ```
   `note` the above code will work but it is a asynchoronus code, means kabi kabi user register phela bhej dy ga hlka abi insert hua he nhi hoo ga record
   ```js
        app.post("/siginup", async(req, res) => {
    const {username,email,password} = req.body; // destructuring the data

    await userModel.create({
        username :username,  // inserting the row 
        email:email,
        password :password}) 

        res.send("user register") // showing message on console
    
   });
   ``` 

    for testing sending the enter details back the front page 
    ```js 
    app.post("/siginup", async(req, res) => {
    const {username,email,password} = req.body; // destructuring the data

    const newuser = await userModel.create({  // variable
        username :username,  
        email:email,
        password :password}) 

        res.send(newuser); // send the new user data on the web page
    
    });
    ```

### Q how to create the instance row inside the usercollection
to insert the record into the Db we need the help of a usermodel that we have imported in the App.js, above clearly demostrate how we will do this task

```js 
res.send(newuser); 
```
observe the output given through this in the browser their is an `id`. this id is being assigned by the `mongoose` (package which we have installled). because of this id if we put same deatils for the two times then two rows will be created in the actuall database 

# perfomming CRUD

we already have done create lets look for the read 

## Reading the database
```js
// code in the app.js 
app.get("/get-users", (req,res) =>{
    userModel.find().then((users)=>{   
        res.send(users)
    })
});
```
`.find()` will return all the users created with the help of usermodel 
.then is being used to show them on the browser
 `.then()`. it has an arrow function and all the values fetched with the help of `find() `are given one by one to the arrowfunction {users is respresating these values}. and then inside the body we decide how we need to show them 

### Q how we can retrieve the specific person data 
by passing the argument to the `.find()` 

```js
app.get("/get-users", (req,res) =>{
    userModel.find(
        {
            password: "abc" // filtering users 
        }
    ).then((users)=>{   
        res.send(users)  // send the users data to the web page
    })
});
```

### Q Any other way of retreving data 

yes .findone() return only one user. if their are multiple uers then it will return the person that will be created at the  first point 


```js
app.get("/get-users", (req,res) =>{
    userModel.findOne(
        {
            password: "abc" // filtering users 
        }
    ).then((users)=>{   
        res.send(users)  // send the users data to the web page
    })
});
```

### Q what if your filter condition does not mathc any thing 

- .find() will give you any empty array     `[]`
- .findOne()  return nulls     but you need to console.log that thing on the screen then 

## Updatind db
first we find then we update by using the method `findOneAndUpdate()`

first object is for findig second object is for waht we need to update 


## delete user 
`findOneAndDelete` 

### Q: if both usershas same deatils then we are always getting the first one bcz of findone waht if we need to delete the second user 
we shouldn't allow the two users with exactly same inforamtion to be get registerd for that when defining the model make sure to give gmail the `unique` consstraint 

```js

app.get("/delete-users", async (req,res) =>{
    await userModel.findOneAndUpdate(
        {
            password: "a" // filtering users 
        }
    ).then((users)=>{   
        res.send(users)  // send the users data to the web page
    })
});
```


# Conclusion
mongoose is require in the config and models folder in config help in coneecting with the database. in the models it define the collection and then we export them(collection and connection) and require them inside the app.js. then write the routes to perfom cruds operations 




