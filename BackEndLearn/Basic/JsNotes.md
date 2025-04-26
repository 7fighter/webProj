# callbacks
A callback in JavaScript is basically a function that you pass as an argument to another function to be executed later. The key idea here is "later." It’s JavaScript's way of saying, “Hey, when you’re done doing X, run this function for me.”

### Q: Why are callbacks used?
JavaScript is asynchronous. That means tasks like reading files or waiting for API responses don't block the program from doing other things. Callbacks help handle this asynchronous behavior by defining what should happen when the task is complete.

```js
const server = http.createServer((req, res) => {
    console.log(req.url); 
    
    res.end("Hello World!"); 
});
```

1. `http.createServer()` creates a server and passes two objects, `req` and `res`, to the callback function, representing the HTTP request and response.  
2. `req` (an instance of `http.IncomingMessage`) contains request details like `url`, `method`, and `headers,` while `res` (an instance of `http.ServerResponse`) provides methods like `.end()` and `.setHeader()` to construct responses.  
3. These names (`req` and `res`) are user-defined but internally linked to Node.js's design and functionality, inheriting their properties/methods from `http` classes.  
4. The callback function is executed whenever a request hits the server, allowing you to log `req.url` or respond using `res.end()`.  
5. Node.js handles the assignment of `req` and `res` objects, ensuring they behave differently while following the HTTP protocol's standards.  