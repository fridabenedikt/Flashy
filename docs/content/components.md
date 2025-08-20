# Components

A component is typically code you intent to use multiple times, or if you want to extract a portion of code to another file to avoid one file to be to bloated.

For components intended to be used accross different pages/routes they belong in the [components](../../src/components/).

## How to create a new component

Here we will follow a simple example of how to create a component with a given title and text.

Firstly create a new folder in the [components](../../src/components/) folder titled `MyComponent` (notice pascal case convention). Then create a file inside titled `index.tsx`.

If you want styling specific to this component also create a file called `MyComponent.module.css` and follow [the guide on styling](styling.md).

Then start coding:

```typescript

// all imports at the top
import { useState } from 'react'

/*
Here we define the types for the component parameters/props.
Note: not all parameters is required
*/

type Props = {
    title: string;
    text: string;
    isBlue?: boolean;
}

/*
Here we create a function with the same name as the file "MyComponent" and define what parameters this component needs
Note: default value for optional parameter
*/
const MyComponent = ({ title, text, isBlue = false}: Props) => {


/*
Finally there is the return statement were we write JSX (HTML with JS)
Use curly brackets to write code, writing just variables will add them as text
Note: normal if statements does not work inside JSX, instead use the Conditional (ternary) operator
*/
    return (
        <>
            <h1>{title}</h1>
            <p>{isBlue ? "I am blue" : text}</p>
        </>
    )
}

// then we export the function/component so that we can import it whereever we want to use it
export default MyComponent;

```

Now you have created a component

In order to use it go to whatever file you want to use it in and type:

```TSX
// top of page
import MyComponent from '~/src/components/MyComponent/'

// ..your code

const sampleText = "Lorem ipsum dolor sit amet.."

// inside a different component or page
return (
    <>
        <div>Other sample code</div>
        <MyComponent title="Sample Title" text={sampleText} />
        <Mycomponent title="Other Sample Title" text="" isBlue />
        {/* Note: this is the same as isBlue={true} */}
    </>
)
```

## If you are more curious

The syntax for creating the function/component may be a little strange as we declare it as a constant variable instead of using the function keyword. That would work to but there are certain differences in how variables are scoped. The way described above is most common and easy to use.

Note: `() => {}` is a way to create any function where the code goes between the curly brackets.

As you may know, normal javascript files use the `.js` filename extension. In react we use what is called JSX and therefore use the extension `.jsx`, Since we also use typescript we use the extension `.ts` for pure code files example in api folder and `.tsx` for react files.

The ternary operator in the example above functions like this: if isBlue is true it returns "Im blue" if not sampleText variable. Both alternatives would result in text on the screen

If you do not want the else condition do this:

```JSX
return (
    <>
    {isBlue && "Im blue"}
    </>
)
```

This prints "Im blue" is isBlue is true and nothing otherwise.
