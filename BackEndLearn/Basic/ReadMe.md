 fnm env | Out-String | Invoke-Expression  // run in power shell


console.log("check.js loaded");  // for checking if file runs through cmd

first: changing the directory to the project folder, then: so that we run the init -y comand fro the package.json  
```cmd 
cd C:\Users\Hp\Desktop\WEBPROJ\BackEndLearn\Basic
cd C:\Users\Hp\Desktop\webDev\BackEndProj\GDriveClone
//cmd 2 : 
npm init -y 
```
### Q 1:what is package.json
developed for the user, if all get deleted and only this file got left then we can still regain everthing just by using this file. 
`what it gives`: it gives the meta data about the webapp that we are building, it is sfor the developer usage. main thing is `dependencies` which will be shown when we download any package inside using npm. `note` here just the name of the package will get stored bcz here we maintain a list about the things used in the web app that are downloaded using npm
### if you accidently has deleted packagelock.json and nodemodule then run this cmd in terminal for recovery
but you must have package.json aaliable 
```cmd 
npm init i
```

# Npm Packages

similar to libararies that in programing language developed by other user and we can use them by importing in our system. Some packages are already avaliable but some needs to be downloaded and to download them we use `npm`. and on the websiete of npm documentation regarding these pacakages is avliable



when we install anypackage using the commands
```cmd
npm i cat-me

npm i nameOFPackage  // remove this line before run
```
then two things will be downloaded 
    1. nodeModulePackge 
    2. pacakge-lock.json
### Q2. what is nodeModulePackage 
it holds the actuals files that we have downloaded using npm i command  
### Q2. what is package-lockjson
Explains the things that are in package.json with more details. it is for the system


# Building the htpp server using http pacakge 
http is already built-in so no need to intall using npm
codein the .js file 


```js 
const http = require("http");//this is a built in package

const server = http.createServer((req, res) => { //using create making a server and then runnnin an arowfunction on it  
    res.end("Hello World!"); 
});


server.listen(3000, () => {
    console.log("Server is running on port 3000");
    // aik req ayi or us ka response server kr rah, jb v req ayi gyi arrow funtion chla ga
});
```
cmd cmd for to Run it
```cmd 
node App.js 
node filename.js
```

`to watch server response `
in browser write 
```
localhost:3000
```

# Routing
till now if we do small changes like, let's show the url on the cmd a
 
```js 
const http = require("http");

const server = http.createServer((req, res) => {
    console.log(req.url); // this modifiyaton just 
    
    res.end("Hello World!"); 
});


server.listen(3000, () => {

    console.log("Server is running on port 3000");
});
```

outputs of this modifiyed code 
```
in browser we have write      http://localhost:3000/    output on cmd: / 
in browser we have write     http://localhost:3000/About   output on cmd: /About 
```

### Q4 we have to restart server after every change???
yes, we have to manually stop and reRun from the cmd for every single change we made

easy solution for this:
a command came which is nodemon commmand which is written as 

```cmd
npx nodemon App.js
npx nodemon nameOftheFileRunning
```



## Hitting specific Route 

from the above outputs it is clear that for the specific url we get specific results on the cmd, same thing is callled `routing`  and now we will use this thing for showing different things on the browser as per the route(url that person inputs) 

```js 
const http = require("http");

const server = http.createServer((req, res) => {
if (req.url === "/profile") {
    res.end("<h1>Welcome to the profile page </h1>");//these if and elseif are extra just 
} else if (req.url === "/about") {  
    res.end("<h1>Welcome to the about page</h1>");
}});


server.listen(3000, () => {

    console.log("Server is running on port 3000");
});
```





