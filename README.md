# React Tutorial v2

##### components
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

##### jsx 
    * JSX allows you to write HTML in React by converting HTML into React components, helping you to more easily create user interfaces for your web applications.
    * Curly braces let you “escape back” into JavaScript so that you can embed some variable from your code and display it to the user.
    * We can put complex expression inside the JSX curly braces too.
    syntax:
        <img src="" alt={'Photo of ' + user.name} />

##### jsx conditional rendering
    * if else conditional rendering 
    syntax: 
        {isLoggedIn? (</AdminPanel>) : (</LoginForm>)}
    * if we don't need else, using AND operator
        {</isLoggedIn> && </AdminPanel>}
    * if value in array or object exist then pass it, else return the right side value
        {curr_user = user.name?? default_name }

##### map function 
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

##### Necessary things 
* importing:
    local
    import <name> from "./src/img/profile"

    global
    import { useState, useEffect } from 'react';

* double curly braces using attribute style
    By default style attribute is a object
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