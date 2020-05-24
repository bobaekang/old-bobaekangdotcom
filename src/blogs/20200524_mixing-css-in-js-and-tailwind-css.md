---
title: 'Mixing CSS-in-JS and Tailwind CSS'
tags: ['Reactjs', 'Tailwindcss', 'trick']
---

Over the last couple of weeks, I've spent more and more time studying and working on projects using React.js. This helped me take a closer look at and further familiarizing myself with the React ecosystem.

At first look, React ecosystem looked rather chaotic--compared to other competing solutions like Vue.js--in a sense that there is no "Facebook-official" set of libraries for developing React applications. From routing to state management to standard UI components, React developers are essentially free (i.e. left) to make the decisions on their own.

However, there is in fact a smaller set of standards that emerged over time: `react-router` for routing, `redux` and its friends for advanced state management, etc. And when it comes to styling, CSS-in-JS seems to be that standard while there is no single library to be _the_ CSS-in-JS solution. This is even [mentioned in the official documentation FAQ page on styling](https://reactjs.org/docs/faq-styling.html).

My first introduction to CSS-in-JS was via Material-UI's `@material-ui/styling` package (documentation [here](https://material-ui.com/styles/basics/)) for this very blog. Originally I used its `withStyles` higher-order component API but later switch to `useStyles` hook API. Although I was never blown away by CSS-in-JS,[^1] I liked how it allowed me to collocate the style with the template and logic of the component. My web development journey began with Vue.js, and this reminded me of Vue's SFC. Not bad.

[^1]: Frankly, and perhaps due to my limited experience and imagination, CSS-in-JS felt little different from writing raw CSS except more confusing because of using camalCase for the CSS properties.

Meanwhile, I have also dabbled with Tailwind CSS and its "utility-first" approach to writing CSS [for a personal project a while ago](./no-react-no-vue-no-problem). Looking back, I was already somewhat used to the idea of "utility CSS classes" from Vuetify (e.g. [these utility classes for spacing](https://vuetifyjs.com/en/styles/spacing/)). While the scope of Vuetify utility classes is more limited than that of Tailwind CSS's, the ergonomics felt quite similar. Again, not bad.

So what if I _mix_ CSS-in-JS and Tailwind CSS together? I searched around to see how others who are more talanted/experience than I are doing it, and came to one blog post presenting a few different ways to style React components using Tailwind's utility classes.[^2] And one of these ways really clicked in my head! So I started using it in my new project at work, and found that this led to a highly flexible yet manageable way to style React components.

[^2]: Sadly, I could not find the blog post again while writing the first draft of the current post. I will keep an eye out and update this post once I find it.

To illustrate this, let me take a quick example to illustrate my point: a button component with blue background, bold white text, and slightly rounded corners. The color lightens up a bit on hover. Simple as that.

Here is one way to achieve this using CSS-in-JS:

```tsx
// CSS-in-JS with @matarial-ui/styles
import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  button: {
    backgroundColor: '#4299e1',
    borderRadius: '0.25rem';
    color: 'white',
    fontWeight: 700;
    padding: '0.5rem',
    '&:hover': {
      backgroundColor: '#90cdf4',
    }
  },
})

const Button = () => {
  const classes = useStyles()
  return <button className={classes.button}>Click me</button>
}
```

And here is how I'd style the button using Tailwind CSS:

```tsx
// Tailwind CSS
import React from 'react'

const Button = () => {
  return (
    <button className="bg-blue-500 hover:bg-blue-300 text-white font-bold rounded p-2">
      Click me
    </button>
  )
}
```

Each approach is perfectly acceptable but not without certain drawbacks.

On the CSS-in-JS side, it is possible but difficult to write styles in a modular fashion. While this is hardly a problem with one simple component, it can quickly grow out of control for more complicated components that consist of multiple JSX elements and require elaborate styling where certain styles will be duplicated for different elements. This can hurt maintainability. Sure, creating "utility classes" in CSS-in-JS for common styling is possible, but do we really want to get into, e.g., `className={[classes.textWhite, classes.fontBold],join(' ')}`? No thanks.

On the Tailwind CSS side, it can be tricky to create and reuse a higher level CSS class that composes multiple low-level utility classes and represents a unit of style that is more meaningful for the given component. This inability of abstraction leads to using five, ten, or even more utility classes per JSX element. This also can hurt maintainability. Yes, Tailwind CSS provides [the `@apply` directive](https://tailwindcss.com/docs/functions-and-directives#apply) to compose utility classes, but using `@apply` requires the style to live outside the component in a separate stylesheet. And I like them together.

So how can I have my 🍰 and eat it? Watch this:

```tsx
// CSS-in-JS & Tailwind CSS
import React from 'react'

const classes = {
  button: 'bg-blue-500 hover:bg-blue-300 text-white font-bold rounded p-2',
}

const Button = () => {
  return <button className={classes.button}>Click me</button>
}
```

How about _that_? This mixed approach allows me to easily define and reuse higher level classes while retaining most of the benefits of using Tailwind CSS, including writing less CSS!

In fact, the mixed approach is arguably better: I can now easily parameterize the custom CSS classes by making each class a function. For example, the `classes.button` can be extended to allow different colors.

```tsx
// Supercharged CSS-in-JS & Tailwind CSS
import React from 'react'

type ButtonProps = {
  color: 'blue' | 'red' | 'purple'
}

const classes = {
  button({ color }: ButtonProps): string {
    return `bg-${color}-500 hover:bg-${color}-300 text-white font-bold rounded p-2`,
  }
}

const Button = ({ color = 'blue' }: ButtonProps) => {
  return <button className={classes.button({ color })}>Click me</button>
}
```

Of course, nothing should stop me from adding more parameters to extend `classes.button`. How about a boolean `round` parameter to toggle between `rounded` and `rounded-full` utility classes? Or another boolean `large` parameter to toggle between `p-2` and `p-4`? The sky's the limit.

Is this asking too much for a single CSS class? Maybe. The point, however, is that this mixed approach empowers me to try these wild experiments while keeping my style maintainable. _This_, for me, makes writing CSS fun again!
