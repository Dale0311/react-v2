# React Tutorial v2

### components
* React apps are made out of components 
* A component is a piece of user interface that has its own logic and apperance
* Component can be small as a button or as large as entire page
* Component can be nest inside another component
    syntax:
        function myApp() {
        return  
            ( 
                <>
                    <h1>Hello world</h1>
                    <Button />
                </>
            );
        }

        export default myApp;

    notes: 
        components should always have one parent tag
        react component always start with a capital letter   

### jsx 
* JSX allows you to write HTML in React by converting HTML into React components, helping you to more easily create user interfaces for your web applications.
* Curly braces let you “escape back” into JavaScript so that you can embed some variable from your code and display it to the user.
* We can put complex expression inside the JSX curly braces too.
syntax:
    <img src="" alt={'Photo of ' + user.name} />

### jsx conditional rendering
* if else conditional rendering 
syntax: 
    {isLoggedIn? (</AdminPanel>) : (</LoginForm>)}
* if we don't need else, using AND operator
    {</isLoggedIn> && </AdminPanel>}
* if value in array or object exist then pass it, else return the right side value
    {curr_user = user.name?? default_name }

### map function 
* map fn is important to react in terms of rendering an array of items inside a tag or component 
    e.g: 
        const items = fruits.map(fruit=>
        {
            return 
            (
                <li 
                key={fruit.id}
                style={{color: fruit.isRecommended? "green" : "red"}}
                >
                    {fruit.name}
                </li>
            )
        })
### functions
* functions are everything in react it can serve as a component, utils or even pure function
* function outside vs inside a component
    1. Writing functions outside component makes it easier to define, read, and test if the function does not rely on props.
    2. Writing functions inside component will make the function create new instance with every re-render.
    3. fn that are inside a component can access any variable in the component without passing it.
* passing prop to a callback fn
    syntax: onClick = {() => handleClick(name)}

### props
* are the parameters/arguments that we pass to a component and function

### event listener
* occurs when a certain action is done
* when passing fn inside a event we don't need parenthesis "()"

### useState
* used to keep track of strings, number, bool, etc.. inside a component. 
* it gives us a getter and setter.
* it update the getter whenever we invoke the setter
* it rerenders the components everytime the setter is invoke
* if the useState is inside the component everytime we invoke that component it will have its own state.
    everytime we invoke MyButton it will create it's own state not affecting the others MyButton
    
    syntax: 
        function MyButton()
            const [num, setnum] = useState(0);
            function handleClick(){setnum(oldVal => oldVal+1)}
            return
                (
                    <button onClick={handleClick}>{num} add another 1</button>
                )

* most of the time we'll need components to share data and always update together.
  to do this we need to declare the state "upwards" to the parent of MyButton e.g MyApp
  and then pass the values and fn using props

### Destructuring 101
* copy the values of the variable
* unpacking array, object or properties into distinct variables
syntax: 
    const arr = [["Peter", "Jane"]]
    const newArr = [...arr, ["Hulk", "Black Widow"]] -> [["Peter", "Jane", "Hulk", "Black Widow"]]

    or 

    const persons = [{name: "Peter"}, {name: "Jane"}] 
    const [person1, person2] = ...persons

### Necessary things 
* importing:
    local
    import <name> from "./src/img/profile"

    global
    import { useState, useEffect } from 'react';

* double curly braces using attribute style
    By default style attribute is a object.
    {} -> first curly braces go to javascript.
    {{}} -> second curly braces to access the object of attribute style
    syntax: 
        <img
        style =
        {{
            width: user.imageSize, 
            height: user.imageSize, 
        }}
        />
* Array(9) lets you create an array of 9 elements .fill(value) lets you place the value in each element
syntax: Array(9).fill(null)