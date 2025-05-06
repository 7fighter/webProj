1:00 to 1:15min

# form controls
we use form control so that we can bring the data to the backend 

```html
<form action="/getFormData" method="get">  <!-- name of get rout which we created in app.js, by default all form hits post--> 
      <input type="text" name="username" placeholder="Enter Username" required /> <!--name is realy imp bcz backend pr yh he name as a attribute ata hain (similar to dbs attribute ) -->>
      <input type="password" name="password" placeholder="Enter Password" required />
      <button type="submit">Sign Up</button>
    </form>
```

`get route just for example so that we see how in url data is shown` 

```js 
app.get("/getFormData", (req, res) => { // syntax same as the get route 
    console.log(req.query); // output the data in the console (not a professional)
    res.send("Form data received!");   //to avoid from loading 
});

```
 

### Q how data is shown in console
for the above code output for req.query on console after entering the data is :

```cmd
[Object: null prototype] { username: 'a@gmail.com', password: 'a' }
```
`note` as you input data your url route will changes to `getFormData` which is the name of our get route that is used in the ejs form,
and it is also showin the password over here so ``alert``


# Post method 

it does not show the data inside the url when we send to backend, instead of req.query write req.body bcz data cames here  

```js 
//post  sends data to the server 
app.post("/getFormData", (req, res) => {
    console.log(req.body); //  alert body here
    res.send("Form data received!");   //to protect from loading 
}); 
```
html code will be 
```html 
   <form action="/getFormData" method="post"> 
```

output on console 
```
undefine
```

### Q: Reason behind not using get for sendng data to the server, purpose of post and how it get connetect with html(ejs)

- when use get for data sending data get shown and any on can see it through url
- purpose of post is to send data from browser to the server and hide it so that no one see it 

- to connect it with ejs. we write the postmethod exact route name(written in .js{get-form-date in this case}) inside the form action, and chage the form method to the post 

### Q: post has hidden the password and detils from the url and from the cmd now how to view these deatials

to view them we use the middle ware that is 

```js
app.use(express.json())
app.use(express.urlencoded({extended: true}))
```
`note` these both are `built in middlewares`


## Connecting css with the ejs 

1. make a folder name `public` and here you will put your css files
2. term used for these types of file is `static files`. user can access them without authentication and server will provide them 
   
   to connect it with our js we will take help from the `built in middle ware` that is 
```js 
    app.use(express.static("public"))// folder name is given over her similar to setingup   the  ejs file. 
   ```
   here my css file is directly inside the public folder. `note` the backslash that is before the file name is really important some time it runs without backslash and sometimes it doesnot  
```cs
<link rel = "stylesheet" href = "/siginup.css">  <!-- This "/"is important -->
```

### Q the process of connecting js with the app is same or is their any difference
process of connecting js with the app is exactly same as the css
1. .js file should be under the public folder 
2. should be properly linked with the .ejs(html)
3. through built in middleWares include it in the App.js code 


### Q what we do when their are mutiple pages css ans js 

in that case we make sub folder inside the pubic folder.
---
in our here we made a login folder and we place the login.css and js in the login
conecting with .ejs will be a little differeent our here

```html
<!-- after the folder  -->
  <link rel = "stylesheet" href = "/login/login.css"> 
<!-- before the folder  -->
  <link rel = "stylesheet" href = "/siginup.css"> 

<!-- same case for the .js of page -->

```
### what we learn 

formcontrol, connecting html `form` with App.js route, importance of post, file structure for css and js (for page)and connecting them with the ejs and App.js[static files], builtinmiddleware for accesing data and connecting static files

