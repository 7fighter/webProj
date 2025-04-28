# middleWare 

### Q: req,res,next is of type what
```js
app.use((req,res,next)=>{
  console.log("Middleware is running"); // middleware is a function that has access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.
})
```
this is similar to java, when we create a parametrize method, then we define the type of arguments it will take. 

similarly here we already has written in the defination of use that it can take a function as an argument and if the function that we are passing has arguments then the first will be of type request (means got the capabilites of it ) second is req and third is next 

it does not matter whether we write request, response, next