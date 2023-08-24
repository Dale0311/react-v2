# React Tutorial v2

### components

- React apps are made out of components
- A component is a piece of user interface that has its own logic and apperance
- Component can be small as a button or as large as entire page
- Component can be nest inside another component
    <p> syntax: </p>  
        function myApp() {
        return  
            ( 
                <>
                    <p>Hello world</p>
                    <MyButton />
                </>
            );
        }

        export default myApp;

  notes:
  components should always have one parent tag
  react component always start with a capital letter

### jsx

- JSX allows you to write HTML in React by converting HTML into React components, helping you to more easily create user interfaces for your web applications.
- Curly braces let you “escape back” into JavaScript so that you can embed some variable from your code and display it to the user.
- We can put complex expression inside the JSX curly braces too. <br>
<p> syntax: </p>  
    < img src="" alt={'Photo of ' + user.name} />

### jsx conditional rendering

- if else conditional rendering
    <p> syntax: </p>   
        {isLoggedIn? (</AdminPanel>) : (</LoginForm>)}

- if we don't need else, using AND operator
  {</isLoggedIn> && </AdminPanel>}
- if value in array or object exist then pass it, else return the right side value
  {curr_user = user.name?? default_name }
- optional chaining - access the property of an object
  {username = user?.name} #returns null if the user is falsy

### map function

- map fn is important to react in terms of rendering an array of items inside a tag or component
  e.g:
  const items = fruits.map(fruit=>
  {
  return
  (
  <li
  key={fruit.id}
  style={{color: fruit.isRecommended? "green" : "red"}} >
  {fruit.name}
  </li>
  )
  })

### functions

- functions are everything in react it can serve as a component, utils or even pure function
- function outside vs inside a component
  1. Writing functions outside component makes it easier to define, read, and test if the function does not rely on props.
  2. Writing functions inside component will make the function create new instance with every re-render.
  3. fn that are inside a component can access any variable in the component without passing it.
- passing prop to a callback fn
    <p> syntax: </p>onClick = {() => handleClick(name)}

### props

- are the parameters/arguments that we pass to a component and function

### event listener

- occurs when a certain action is done
- when passing fn inside a event we don't need parenthesis "()"

### useState

- used to keep track of strings, number, bool, etc.. inside a component.
- it gives us a getter and setter.
- it update the getter whenever we invoke the setter
- it rerenders the components everytime the setter is invoke
- if the useState is inside the component everytime we invoke that component it will have its own state.
  everytime we invoke MyButton it will create it's own state not affecting the others MyButton

    <p> syntax: </p>  
        function MyButton()
            const [num, setnum] = useState(0);
            function handleClick(){setnum(oldVal => oldVal+1)}
            return
                (
                    <button onClick={handleClick}>{num} add another 1</button>
                )

- most of the time we'll need components to share data and always update together.
  to do this we need to declare the state "upwards" to the parent of MyButton e.g MyApp
  and then pass the values and fn using props

### Destructuring 101

- copy the values of the variable
- unpacking array, object or properties into distinct variables
  <p> syntax: </p>  
      const arr = [["Peter", "Jane"]]
      const newArr = [...arr, ["Hulk", "Black Widow"]] -> [["Peter", "Jane", "Hulk", "Black Widow"]]

      or

      const persons = [{name: "Peter"}, {name: "Jane"}]
      const [person1, person2] = ...persons

### Pure functions

- <b>It minds its own business</b>. It should not change any objects or variables that existed before rendering.
- <b>Same inputs, same output.</b> Given the same inputs, a component should always return the same JSX.
- <b>You should not mutate any of the inputs that your components use for rendering </b>. That includes props, state, and context. To update the screen, “set” state instead of mutating preexisting objects or copy the props to modify.
- When you need to “change things”, you’ll usually want to do it in an event handler

### Necessary things

- importing:
  local
  import <name> from "./src/img/profile"

  global
  import { useState, useEffect } from 'react';

- double curly braces using attribute style
  By default style attribute is a object.
  {} -> first curly braces go to javascript.
  {{}} -> second curly braces to access the object of attribute style
    <p> syntax: </p>   
        < image
        style =
        {{
            width: user.imageSize, 
            height: user.imageSize, 
        }}
        />
- Array(9) lets you create an array of 9 elements.fill(value) lets you place the value in each element
    <p> syntax: </p>  Array(9).fill(null)

- props vs state - these are the two types of model data in react.

  1. Props are like arguments you pass to a function. from parent to child component
  2. State is like component's memory. it lets a component keeps track of some information and change it in response to interaction.

  In sumarry both are use in a component a parent often keep a data to a state while the child component receive that data in a form of props.

- return - return is so useful when it comes to array, rendering and events
  example:
  < picture of magic return here />

- when to use the setter of state directly and fn that use that setter?
  - we use setter directly when there's no need for additional data manipulation beside the data of the state
  - we use fn that uses setter when there's more data to change before or after the setter.

<h1> Steps on creating the ui in React </h1>

<h2> 0. Single-responsibility principle(SRP) </h2> 
        * Idealy components should follow the SRP wherein components only do one thing

<h2> 1. Break the UI into a component hierarchy </h2> 
        * start by drawing boxes around every component and subcomponent in the mockup and naming them
        * create a hierarchy parent-child relation on every component
        img here

<h2> 2. Build a static version in React</h2> 
        * create the static version of the app using the hierarchy that we created
        * don't add any interactivity yet such as states.
        * if the project is small we can start by top-down. meaning we'll create the components from top to bottom
            else, if the project is large create the app from bottom to top.

<h2> 3. Find the minimal but complete representation of UI state</h2>
        * think of all of the pieces of data that is present to your application
        * ask yourself what are the state and props
            * qualifications for a data to be NOT in state:
                - it remains unchange overtime
                - passed down from parent to child/this component
                - can you render/compute it base on existing state/method <br>
                    example: <br>
                        const atLegalAge = user.age? true: false
                        {atLegalAge && < Proceed />}
                    note: I didn't need to use state because the atLegalAge var is computable using existing state

<h2> 4. Identify where your state should live</h2>
        * steps to identify on where the state should live
            1. Identify every component that renders something based on that state.
            2. Find their closest common parent component, a component above them all in the hierarchy.
            3. Decide where the state should live
                3.1 Often, you can put the state directly into their common parent.
                3.2 You can also put the state into some component above their common parent.
                3.3 If you can’t find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common parent component.
                 
<h2> 5. Add inverse data flow</h2>
        * basically use the setter of each state in order to rerender the application, tada.
