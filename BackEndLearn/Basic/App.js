const http = require("http");//this is a built in package

const server = http.createServer((req, res) => {
if (req.url === "/profile") {
    res.end("<h1>Welcome to the profile page </h1>");
} else if (req.url === "/about") {  
    res.end("<h1>Welcome to the about page</h1>");
}
else{
    res.end("hello")
}});


server.listen(3000, () => {

    console.log("Server is running on port 3000");
});