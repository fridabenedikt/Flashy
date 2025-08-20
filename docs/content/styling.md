# Styling (CSS)

In this application we only use "basic" css for styling.

Each component or page should have its own css file. This way it is easy to track were different styles are applied so you do not have to search through a giant css file to find the class you want to change.

There exists a file called `global.css` this is primarily for a few certain things that will apply to the entirety of the page, such as styling for the root/body tags and global variables.

> CSS variables: They make it easy to have a consistent design accross our application. There is already a few examples and a guide on how to use them in the [global.css](../../src/global.css) file.

## How to style your component or page

Inside the same folder of your page or component create a file called `MyComponent.module.css`. In there you write CSS as normal.

> **Why not just `.css`?** (For those interested)
>
> Normally CSS files only end in `.css`but adding `.module.css` is a nice trick that is possible with the REACT version we use. Behind the scences react will change the class name you define from f.eks. `card`to `_card_16r6j_3`. This ensures that in case the classnames get defined different places they will always apply no matter where the `.css`file is placed. So this is just a little feature that might prevent some headaches.

If you create the following class: (preferably camelcase)

```css
.myClass {
  color: blue;
}
```

then inside your component or page you add the following:

```JSX
import styles from './MyComponent.module.css'

// your code

return (
    <div className={styles.myClass}></div>
)

```

Normally doing..

```JSX
<div className="myClass"></div>
```

.. works fine, but when using `.module.css` you have to do the abovementioned way.

## CSS Tips and tricks

**FLEXBOX** is golden for all your positioning needs. Check out [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) for everything it can do.

TLDR; Make the container (surrounding HTML element) a flexbox and align things like this:

```css
.myContainer {
  display: flex;
  justify-content: center; /* horizontal alignment */
  align-items: center; /* vertical alignment */
}
```

**SIZE UNITS** can be confusing since there is a lot of options. Very often you want to avoid absolute lengts like `px`, `mm` etc. Because then your design might look very different on different sized screens. [W3 CSS Units](https://www.w3schools.com/cssref/css_units.php) for more.

**GOOGLE** everything else you dont know how to do. There's usually someone on stackoverflow who have asked the same.

> - "How to make button change color when I hold the mouse over it"
> - "Make flexbox go down instead of to the side"
> - "CSS TEXT BLUE"
