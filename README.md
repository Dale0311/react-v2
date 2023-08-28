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
        {isLoggedIn? (</ AdminPanel>) : (</ LoginForm>)}

- if we don't need else, using AND operator
  {</ isLoggedIn> && </ AdminPanel>}
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

### hooks

- functions starting with <b>use</b> keyword
- can only be called at the top level of your components or your own Hooks.
- You can’t call Hooks inside conditions, loops, or other nested functions

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

- <h4>Principles for structuring state:</h4>
  1. <b>Group related state</b> - If we always update two or more state variables at the same time, consider merging them into a single state variable.
  2. <b>Avoid contradictions in state</b> - if we have two or more state that contradicts each other, try to avoid it.
  3. <b>Avoid redundancy</b> - if a certain variable can be compute/render from a existing props/state, create a normal var.
  4. <b>Avoid duplication in state</b> 
  5. <b>Avoid deeply nested state</b>

  links to docu - <u>https://react.dev/learn/choosing-the-state-structure</u>

- <b>Setting state only changes it for the next render</b>
  example: <br>
  < btn onclick={()=>{
  setNum(oldval => oldVal + 1); -> the value of num will be 1 on the next render
  setNum(oldval => oldVal + 1); -> the value of num will be 1 on the next render
  setNum(oldval => oldVal + 1); -> the value of num will be 1 on the next render
  }}> <br>
  Note:
  1. whenever we changes the value of state variable it doesn't automatically re-render,
  2. it executes the rest of the code before re-render
  3. if we access the state variable after updating it we'll have the snapshot value instead of the updated one.
     example:
     handleClick(){
     setNum(oldVal => oldVal + 1)
     alert(num) -> expected output: 0 not 1
     }

### Destructuring 101

- copy the values of the variable
- unpacking array, object or properties into distinct variables
    <p> syntax: </p>  
        const arr = [["Peter", "Jane"]]
        const newArr = [...arr, ["Hulk", "Black Widow"]] -> [["Peter", "Jane", "Hulk", "Black Widow"]]
        <br>
        or
        <br>

        const persons = [{name: "Peter"}, {name: "Jane"}, {name: "Steve"}, {name: "Ironman"}]
        const [person1, person2, ...rest] = ...persons
        <br>
        or
        <br>

        const {name, id} = e.target -> #extract the name and id values

        note: syntax sensitive, arr = [], obj = {}

    <p>Updating a nested object: </p>
      setPerson({
      ...person, // Copy other fields
      artwork: { // but replace the artwork
        ...person.artwork, // with the same one
        city: 'New Delhi' // but in New Delhi!
      }
  });

### Pure functions

- <b>It minds its own business</b>. It should not change any objects or variables that existed before rendering.
- <b>Same inputs, same output.</b> Given the same inputs, a component should always return the same JSX.
- <b>You should not mutate any of the inputs that your components use for rendering </b>. That includes props, state, and context. To update the screen, “set” state instead of mutating preexisting objects or copy the props to modify.
- When you need to “change things”, you’ll usually want to do it in an event handler

### Steps on requesting and serving UI

1. Triggering a render (delivering the guest’s order to the kitchen)

- It’s the component’s <b>initial render</b>.
- The component’s (or one of its ancestors’) state has been updated.

2. React renders your components

- On initial render, React will call the <b> root component. </b>
- For subsequent renders, React will call the <b>function component</b> whose state update triggered the render.

<p>
  This process is recursive: if the updated component returns some other component, React will render that component next, and if that component also returns something, it will render that component next, and so on. The process will continue until there are no more nested components and React knows exactly what should be displayed on screen.
</p>

3. React commits changes to the DOM

- After rendering (calling) your components, React will modify the DOM.
- For re-renders, React will apply the minimal necessary operations (calculated while rendering!) to make the DOM match the latest rendering output.
- <b>React only changes the DOM nodes if there’s a difference between renders.</b>

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

- return - return is so useful when it comes to array, rendering, conditionals and events
  example:
  < picture of magic return here />

- when to use the setter of state directly and fn that use that setter?

  - we use setter directly when there's no need for additional data manipulation beside the data of the state
  - we use fn that uses setter when there's more data to change before or after the setter.

- computed property - use the result of the expression as the property name of an object.
  example: {...obj, [ name]: "dale"} -> whatever value the name holds it will use as key at the value "dale";

- template literal - merge strings variables together.
  example: <h1>Hi, {isNameSet ? `${name.firstName} ${name.lastName}` : "guest"}</h1>

- useImmer?

- array crud when it is on state

  1. adding = spread e.g -> [...users, "Dale"];
  2. removing = slice e.g -> const newUsers = users.slice(5, 6);
  3. replacing = map e.g -> const newUsers = users.map(logic here)
  4. sorting = copy the array first and use sort.

  or

  you could mutate the array directly using <b>useImmer</b>

  docu: https://react.dev/learn/updating-arrays-in-state

<h1> Steps on creating the ui in React </h1>

<h2> 0. Single-responsibility principle(SRP) </h2>

- Idealy components should follow the SRP wherein components only do one thing

<h2> 1. Break the UI into a component hierarchy </h2>

- start by drawing boxes around every component and subcomponent in the mockup and naming them
- create a hierarchy parent-child relation on every component
  img here

<h2> 2. Build a static version in React</h2>

- create the static version of the app using the hierarchy that we created
- don't add any interactivity yet such as states.
- if the project is small we can start by top-down. meaning we'll create the components from top to bottom
  else, if the project is large create the app from bottom to top.

<h2> 3. Find the minimal but complete representation of UI state</h2>

- think of all of the pieces of data that is present to your application
- ask yourself what are the state and props
  - qualifications for a data to be NOT in state:
    - it remains unchange overtime
    - passed down from parent to child/this component
    - can you render/compute it base on existing state/method <br>
      example: <br>
      const atLegalAge = user.age? true: false
      {atLegalAge && < Proceed />}
      note: I didn't need to use state because the atLegalAge var is computable using existing state

<h2> 4. Identify where your state should live</h2>

- steps to identify on where the state should live
  1. Identify every component that renders something based on that state.
  2. Find their closest common parent component, a component above them all in the hierarchy.
  3. Decide where the state should live
     3.1 Often, you can put the state directly into their common parent.
     3.2 You can also put the state into some component above their common parent.
     3.3 If you can’t find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common parent component.

<h2> 5. Add inverse data flow</h2>

- basically use the setter of each state in order to rerender the application, tada.
