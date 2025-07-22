following are the terms that are frequently used in the react

# Component

the below code or a function of js is called component main difference from the noramll js function is that react fuction `return ` a `jsx`

### Q what is jsx

it is mixture of js and html css code at one place

```js
// normall componenet look like this
// rafce + tab
import React from "react";

const App = () => {
  return <div>
  App
  </div>;
};

export default App;
```
```js
// check the comments syntax 
import React from "react";

const App = () => {
  //js code logic and use state built over here
  return <div>
   {/*html css code over here */}
    {/*link the js funtion || tailwindcss in the first tag  */}
    {/*if want to write js code without enclosing in tags then enclose it in {} */}
    {/*other componet are also attached here  */}
  App
  </div>;
};

export default App;
```

# hooks || two state binding || use state || react variable

these are the variables of the react

```js
// normll use state code
// usestatesnip + tab
const [name, setname] = useState("");
```
this `usestate(" ")` is settng the `name` to the `" "` as its `initall state` if it was 
const [name, setname] = useState([]);
then it has setted the initall state to emtyArray


# Props

In `normal js` code value passed to the fucntion during building it called `parmeter` of a functon.
Similarly in `react`, passing the paramter to the is called `props`

```js

//suppose you are passing the movie object and you know that it has a name
import React from 'react'

const MovieCard = ({movie}) => {
  return (
    <div>{movie.name}</div> {/*to acces name must use {} */}
    <div>{movie.rating}</div> {/*to acces name must use {} */}
  )
}

export default MovieCard

```
### Syntax of importing the prop component into another Componet 
```js 
// we are importing the Movie card into the App
import React from 'react'
import MovieCard from "./src/pages/MovieCard"

const App = () => {
  return (
    <div>
    <MovieCard movie = {{name:"lion king movie", rating : 5}} /> {/* the {}outside is for usestate usage in the return and {} inside is for the object bcz two fieds name and rating  */}
    </div>
  )
}

export default App

```

### Q what type of syntax do we genrally follow in the `return` of compoent for accesing the propsField or for useState

1. for the usestate in return we enclose the name with the `{}`
2. similarly for accesing the prop field in the return we also enclose it in the `{}`
3. if wants to write js code outside the tag for conditional rendering then also use {}
4. comment inside the return is also enclose in the {}

### Comment in the react 

before the return normall js coments syntax `//`

inside the return enclose them in the `{/**/}`  


### fragmentation or how to add mutiple divs 
fragmention is actuallly used for enclosing the multiple divs inside it so that they can be returned  bcz`note` compoenets return allow only one parent to be get returned 

```js
import React from 'react'

const App = () => {
  return (
    <>
    <div>App</div>
    <div>helloworld</div>
    </>
  )
}

export default App

```
fragmentation is nothing but just an empty tag  `<></>`
the alterantive way of doing is by using div as parent measns one big div enclose everything 
```js 
// suppose we are this time having other compoent in the return App and App3 whose code is written some where else 
import React from 'react'

const App2 = () => {
  return (
    <div>   {/*istead of fragment div is used */}
    <App> </App>  {/*non self closing way of calling component */}
    <App3 /> {/*self closing tag used and this*/}
    </div>
  )
}

export default App2
```

# Exporting component and Component inside another component 
`note`  name of compoent start with the capital letter this is the naming convention of componont in the react 
two main types 
1. default export        ---> at the bottom
2. named export          ---> export is with the compoent name in the start

### Default import syntax for export and import  
```js 
// default export at the bottom
import React from 'react'

const Comp = () => {
  return (
    <div>Comp</div>
  )
}

export default Comp  // exporting over here 
```
using the Comp compnent inside the App Compnent we need import it in the App

```js 
import React from 'react'
import Comp from "../src/pages/Comp" // import like this 
const App = () => {
  return (
    <div>
    <Comp />
    </div>
  )
}

export default App

```

### Named-Export export and import syntax

```js 
// export at the start
import React from 'react'

export const Comp = () => { //export here
  return (
    <div>Comp</div>
  )
}

```
using the Comp compnent inside the App Compnent we need import it in the App

```js 
import React from 'react'
import {Comp} from "../src/pages/Comp" // import like this note the {} 
const App = () => {
  return (
    <div>
    <Comp />
    </div>
  )
}

export default App

```
# Routing 
1. download the react router dom using npm first
2. import it in the main.jsx and wrap the app with browserrouter 
3. in the app.jsx import the router dom
4. now to hit the routes you want to display 
   ```js 
    //app.jsx
    import { Routes, Route } from 'react-router-dom'
    <Routes>
    <Route path="/" element={<Home />} />
    </Routes>
   ``` 
   ```js 
   //main.jsx 
     <BrowserRouter>
      <App />
    </BrowserRouter>
   ```

   # useEffect

    ```js 
    useEffect(() => {}, [])   //here dependency array is empty so it will run the code for only once 
    ```
it is used with the api's. basically it conssit of three parts 
1. arraoe function        --->1st argument 
2. dependency array       --->2nd argument 
follwoin are its uage 
1. it is used to run our code for only once 
2. it is used to monitor the state, means if we put the use state varable into the dependency array so when every the usestate variable get modifiyed our arrow function will run that many times so inshort usestate variable is being monitored


3. clean up functon is the third `part` (it basically cames inside the arrowfunction) its `usage` is realted to the unmounted of a component so, whenever we unmounount a component this cleanup function of useeffect will


```js 
useEffect(() => {
  first

  return () => {    // this returning function is called a cleanup function
    second
  }
}, [third])

```