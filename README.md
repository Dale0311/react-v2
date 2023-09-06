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
- if we want to use OR
  {placeId || '???'} -> if first is truthy else return the second

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

- list of events: https://developer.mozilla.org/en-US/docs/Web/Events#event_listing

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

- <b>Storing information from previous renders</b>
- Usually, you will update state in event handlers. However, in rare cases you might want to adjust state in response to rendering — for example, you might want to change a state variable when a prop changes.
  - If the value you need can be computed entirely from the current props or other state, remove that redundant state altogether. If you’re worried about recomputing too often, the useMemo Hook can help.
  - If you want to reset the entire component tree’s state, pass a different key to your component.
  - If you can, update all the relevant state in the event handlers.
  - if none of the above works, try to use state e.g: const [prevCount, setPrevCount] = useState(count);

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

### useReducer

- much like useState, it allows the user to create complex logic into a one function
  declaration:
  const [ todos, dispatch] = useReducer(todosReducer, intialState)

  - 1. todos - the values
  - 2. dispatch - special fn that takes 1 parameter called action(object) that typically holds a type(string) and key value pair that modifies the initialState
  - 3. todosReducer - a fn that handles all the logic that takes two arguments
       <br>3.1 todos - the values
       <br>3.2 action - the object that we pass from dispatch.
       <br>3.3 returns the updated value of todos.
       <br>3.4 typically consist of switch stmt or if else.

  - 4. initialState or initial value

- <h4>3 steps to migrate from state to reducer <h4>

1.  Move from setting state to dispatching actions

- for all the state functions, replace it with a dispatch that takes an object
- object(action) typically contains a key value pair that modifies the initialState value

2. Write a reducer function

- it is pass to the initial render of useReducer
  syntax: const [ todos, dispatch] = useReducer(todosReducer, initialState)

- typically consist of all the logic of the setter of todos

3. Use the reducer from your component

- const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

### useContext passing data from parent to subsequent child without props.

- an alternative to passing props

- steps on creating a context:

<b>1. create the context</b><br>
import { createContext } from 'react';
export const LevelContext = createContext(1) -> 1 arg and it's the initial value

note: this has its own file. e.g LevelContext.jsx

<br><b>2. Use the context</b><br>
import {useContext} from "react";
import {LevelContext} from "./LevelContext.jsx";

export default function Section() {
const level = useContext(LevelContext);
<br>
<b>3. Provide the context:</b><br>
< section className="section">
< LevelContext.Provider value={level}>
{children}
</ LevelContext.Provider>
</ section>

}

- <h4>Use cases for context:</h4>

- <b>Theming</b> If your app lets the user change its appearance (e.g. dark mode), you can put a context provider at the top of your app

- <b>Current account</b> Many components might need to know the currently logged in user. Putting it in context makes it convenient to read it anywhere in the tree.

- <b>Routing</b> Most routing solutions use context internally to hold the current route.

- <b>Managing state</b> As your app grows, you might end up with a lot of state closer to the top of your app. Many distant components below may want to change it

### useRef: remember information but doesn't rerender

- A ref is like a secret pocket of your component that React doesn’t track. For example, you can use refs to store timeout IDs, DOM elements, and other objects <b> that don’t impact the component’s rendering output. </b>

<br>syntax:<br>
import {useRef} from "react"<br>
const refCount = useRef(0) <br>

- refCount is a object that have a key value of {current: 0}
- refCount.current -> to access the value
- refCount.current = value -> to update the value

- When a piece of information is used for rendering, keep it in state. When a piece of information is only needed by event handlers and changing it doesn’t require a re-render, using a ref may be more efficient.

- When to use refs

  - Storing timeout IDs
  - <b>Storing and manipulating DOM elements</b>
  - Storing other objects that aren’t necessary to calculate the JSX.

- Throttling is the action of reducing the number of times a function can be called over time to exactly one.
- Debouncing is a function called after N amount of time passes since its last call. It reacts to a seemingly resolved state and implies a delay between the event and the handler function call.
  e.g: <br>
  - we have a input, that calls the api base on the input's value.
  - we don't want to call the api everytime we changes the input's value
  - instead we want to call the api after the user stop changing the input's value.

refs: https://redd.one/blog/debounce-vs-throttle

- useRef is useful when interacting with DOM elements
  <br>e.g input ref={inputRef}

- use forwardRef to pass a ref to component
  <br>syntax: <br>
  <br>import {useRef, forwardRef} from "react"
  <br> const MyInput = forwardRef(({props here}, ref) => { code here })

- docu: https://react.dev/learn/manipulating-the-dom-with-refs#recap

- Maps are like objects but it varries in:

  - key Types - unlike object who convert all keys to string, map keys can be any datatypes.
  - Iteration Order - maps keeps the order of key-value pair
  - methods - maps is rich interms of method. suchs as set, get, has, delete, size

- Sets are like anyother data structures but it works only with array

  - store unique values
  - Immutability - sets are mutables meaning we can perform crud in the variable which is not good.

- flushSync is use when we want to force the update instead of que update, so the user interface "never lags behind"
  syntax:
  <br> import {flushSync} from "react
  <br> wrap the setter to a flushSync(()=>{ setItems([...items, newItem])})

- <b>Best Practices using refs</b>
- Avoid changing DOM nodes managed by React. such as conditional rendered by react,

### useEffect

- useEffect runs everytime after ui rendered
- useEffect can run after its dependencies change

- <b>How to write an Effect</b>

  1. <b>Declare an Effect </b> By default, your Effect will run after every render.
  2. <b>Specify the Effect dependencies</b> Most Effects should only re-run when needed rather than after every render.
  3. <b>Add cleanup if needed </b>

- <h4>How to handle the Effect firing twice in development? </h4>
- Common patterns
- <b>Controlling non-React widgets</b>
- <b>Subscribing to events</b>
    <p>If we addEventListener to a element, cleanup return should removeEventListener</p>
- <b>Triggering animations </b>
    <p>If the Effect animates something in, the cleanup function should reset the animation to the initial value</p>
- <b>Fetching data</b>
    <p>If your Effect fetches something, the cleanup function should either abort the fetch or ignore its result:</p>
    <p>create a ignore variable that we changes it bool value to true</p>
- <b>Not an Effect: Initializing the application </b>
    <p>Some logic should only run once when the application starts. You can put it outside your components:</p>
- <b>Not an Effect: Buying a product </b>
    <p>Buying product is not an effect because it is cause by a particular interaction.</p>
    <p>any interaction that is specific can be a eventhandlers</p>
- <b>Development-only behaviors</b>
    <p>When Strict Mode is on, React remounts every component once after mount (state and DOM are preserved). This helps you find Effects that need cleanup and exposes bugs like race conditions early. Additionally, React will remount the Effects whenever you save a file in development. Both of these behaviors are development-only.
    </p>
- <b>Recap:</b>

  - Unlike events, Effects are caused by rendering itself rather than a particular interaction.
  - Effects let you synchronize a component with some external system (third-party API, network, etc).
  - By default, Effects run after every render (including the initial one).
  - React will skip the Effect if all of its dependencies have the same values as during the last render.
  - You can’t “choose” your dependencies. They are determined by the code inside the Effect.

- <b>Effect Lifecycle</b>

  - start synchronizing - e.g: start fetching from api
  - stop synchronizing - e.g: stop fetching/ignoring the data from the api

- <b> Each Effect in your code should represent a separate and independent synchronization process. </b>

- <b>You Might Not Need an Effect </b>

  - You don’t need Effects to transform data for rendering.
    <p>such as variables that can be compute from existing state, props, or context</p>

  - You don’t need Effects to handle user events.
    <p>It is handled by the corresponding event handlers</p>

- <b>Effect Dependencies</b>
  
  - when passing a object or function that is created inside a component, and we use those as dependencies in our useEffect everytime we re-render even if the object or fn values are the same it treats those as not the same

  - If we needed a object or fn that is reactive, we may declare those inside the effect. 

  - or if those obj or fn doesn't reactive, We move them outside the component  

  - sometimes, the objects are passed from parent. so everytime it rerenders it runs the effect. To fix this, we destructure the object outside the effect and passed it as individual dep. 

### useMemo

- it is a function that runs with dep, if the dep doesn't change in re-render it return the cache value

- Is use to optimize the performance of a React component by memoizing (caching) the results of a calculation or function.

- params: calculateValue, dependencies

  - calculateValue is a <b>pure calculations</b>
  - dependencies are variables that when change it reruns the calculateValue in the next render

- how to tell if calculation is expensive
  - if the time it takes to compute is > 1ms, then we will opt to useMemo

### useEffectEvent

- it is part of effect logic but it behaves like a event. 
- the logic inside it is not a reactive
   
### custom hooks
- are user define hooks, that always starts with use
- are use when we want to use the hooks across multiple component
- can combine different native hooks

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
    <p> syntax: </p> Array(9).fill(null)

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
  note: when accessing a key in obj instead of using .(dot) we use squarebrackets even tho it is a obj
  <br>syntax: value={ message[id] } -> <b>the value of message[contact.id]</b>

- template literal - merge strings variables together.
  example: < h1>Hi, {isNameSet ? `${name.firstName} ${name.lastName}` : "guest"}</ h1>

- useImmer?

- array crud when it is on state

  1. adding = spread e.g -> [...users, "Dale"];
  2. removing = slice e.g -> const newUsers = users.slice(5, 6);
  3. replacing = map e.g -> const newUsers = users.map(logic here)
  4. sorting = copy the array first and use sort.

  or

  you could mutate the array directly using <b>useImmer</b>

  docu: https://react.dev/learn/updating-arrays-in-state

- <b>children</b> - a special props that lets you render the value of it inside a component
  <br>
  e.g:
  < MySection>
  < Sort />
  < Todos />
  < AddTodo />
  </ MySection>
  <br>
  function MySection({children}){
  < section>{children}</ section>
  }

- <b>mounting</b> an instance of a component is being created and inserted into the DOM.
- <b>unmounting</b> the component is not needed and gets unmounted.

### the differences between events and effects

- we use effect when the logic needs to execute when a component mount.
- we use event when the logic needs to execute when user does soemthing like pressing a btn.

- when we use effect, the logic <b>automatically</b> executes when the dependency changes
- when we use event the logic <b>manually</b> runs when the user does soemthing like pressing a btn.

### {...props}

- is use when a parent components pass a props to child and that child pass those component to another child.

### Resetting state with a key

- we can use key to reset all the components changes
- it treats the component new or different.
- docu: https://react.dev/reference/react/useState#resetting-state-with-a-key

- any properties can directly access any props or state
  - e.g: < button disabled={message === ''}> </ button>

### Any variable that's inside a components' body are reactive

- because they can change their value during rendering(re-rendering process)

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
