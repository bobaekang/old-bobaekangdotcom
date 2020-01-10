---
title: "The first look into React--from my point of Vue"
---

Well, there is no shortage of articles and blog posts comparing [React](https://reactjs.org/) and [Vue.js](https://vuejs.org/), two of the most popular frameworks for creating modern web applications (and beyond!). And, IMHO, I am not sure if I could bring anything revolutionarily new to the table. So please consider this post as a personal impression rather than a well-researched informational piece.

I was first introduced to modern web development via Vue--it was easy to get started with even for me who barely knew JavaScript. In addition, a powerful UI library like [Vuetify](https://vuetifyjs.com/) helped me to create a fairly good-looking web app and gave me the much-needed confidence to keep going.

Then I came to learn that there is another great option, called React, which is in fact even more widespread than Vue for creating modern web apps. After a bit of procrastinating, I finally brought myself to try it for building my website, first by following [the official step-by-step documentation](https://reactjs.org/docs/getting-started.html).

Now that I've done it, here are a few thoughts of mine:

## For seasoned JS programmers only?

My first impression on React was about the JavaScript-y-ness of its API. Creating a component involved either defining a function that returns JSX expressions or a class that inherits from `React.Components` and includes `render()` method that, again, returns JSX expressions.

By itself, this seems like a straightforward way to create components. However, coming from Vue's single file components (i.e. `.vue` files) providing a clear separation of concerns between structure, style, and logic, React components (combined with its use of JSX) looked rather confusing and, at times, even intimidating to me.[^1]

[^1]: Yes, I know that I can write Vue compoents [using render functions and `createElement()`, throwing JSX into the mix](https://vuejs.org/v2/guide/render-function.html). But that's _not_ how people start writing Vue.

For instance, having to rely on `Array.prototype.map()` to create a list of items or include if-else expression within a `render()` method for conditional rendering made me miss the ease and intuitiveness of Vue directives (`v-for` and `v-if`) used directly in HTML elements. Relying on JavaScript to inject scoped styling into JSX elements via `className` is not intuitive, either.

In short, React felt not _as_ inviting as Vue did when I was just getting started. Had I picked up React first, I would have been progressing at a much slower pace or, worse, given up web development altogether.

## In need of more structure, maybe

Whether it is defined using a function or a class, a React component comes with a minimal internal structure.

Let me use a simple (and silly🤪) example component, `MyPost`. It has two states (`title` and `body`), one computed value (`titleUpper`), and one method (`broSpeak()`). The component will display the title text in uppercase and the modified body text. Here are two possible implementations in React and Vue, respectively:

### `MyPost.js` (React)

```jsx
import React, { useState } from 'react'

const MyPost = () => {
  const [title,  setTitle] = useState('Hello World')
  const [body,  setBody] = useState('This is an awesome component.')

  const titleUpper = title.toUpperCase()  

  const broSpeak = str => str.slice(0, -1) + ', bro!'

  return(
    <div>
      <h1>{ titleUpper }</h1>
      <p>{ broSpeak(body) }</p>
    </div>
  )
}

export default MyPost
```

### `MyPost.vue` (Vue)

```html
<template>
  <h1>{{ titleUpper }}</h1>
  <p>{{ broSpeak(body) }}</p>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello World',
      body: 'This is an awesome component.'
    }
  },
  computed: {
    titleUpper() {
      return this.title.toUpperCase()
    }
  },
  methods: {
    broSpeak(str) {
      return str.slice(0, -1) + ', bro!'
    }
  }
}
</script>
``` 
Technically, at least in this example, the function-based React component using [the new Hooks API](https://reactjs.org/docs/hooks-intro.html) requires less boilerplate and, therefore, has fewer lines of code. However, the Vue component's declarative object API imposes an explicit structure (data, computed, etc.) that essentially self-documents which element does what. Notice that there is no inherent need for the React component to keep all the `useState()` lines on the top.

Ultimately, we spend more time reading code than writing it. In my view, despite the greater degree of flexibility it provides, the relative lack of structure in the React way could easily be a liability rather than an asset in the long run. It then becomes the responsibility of the developer, or the team, to come up with a convention to follow and improve readability and maintainability, which adds extra cognitive load. With Vue's current object API, this is less of an issue.

## `create-react-app` is cool, but...

Today, any serious web app project relies on the power of `webpack`, `babel` and the like. Since React is "only a library," it is a developer's responsibility to put together the additional tooling to one's project.

`create-react-app` was born to streamline that setup process for a React project. Also, since it is Facebook-official, we can expect `create-react-app` to work well with the latest version of React. It also comes with [a nice documentation website](https://facebook.github.io/create-react-app/).

However, considering that the true power of many build tools resides in their extensibility with plugins, `create-react-app` feels a little limiting. A project created using `create-react-app` hides the actual tooling behind the `react-scripts` single dependency, which means I cannot make any changes to the default configurations.

It is possible to get to webpack and so on by `npm run eject`, which replaces `react-scripts` with the underlying dependencies and exposes the configuration files. There are also workaround solutions by the community. Regardless, having to take this extra step feels a little counterintuitive--especially since React expects its users to be well-versed in JavaScript.

In contrast, a project created using [Vue CLI](https://cli.vuejs.org/) gives access to all the tooling configurations by default, making it easy for advanced developers to wield maximum control over their projects as needed.

## 🤔Instead of conclusion

Vue team recently introduced [a new RFC (request for comment) for Vue's function API](https://github.com/vuejs/rfcs/blob/function-apis/active-rfcs/0000-function-api.md) that is [openly stated to be inspired by React Hooks](https://github.com/vuejs/rfcs/blob/function-apis/active-rfcs/0000-function-api.md#comparison-with-react-hooks).

This has sparked a _lively_ discussion [here](https://github.com/vuejs/rfcs/pull/42), [here](https://github.com/vuejs/rfcs/issues/55), [here](https://www.reddit.com/r/vuejs/comments/c319el/vue_3_will_change_vue_in_a_big_way_current_syntax/), and [here](https://news.ycombinator.com/item?id=20237568)) where some have expressed concerns regarding, for example, the added cognitive burden on users and confusion in the ecosystem due to introducing a new way of doing things as well as the maximum flexibility of the new API.

Frankly, I prefer a declarative approach over an imperative one for the reasons I discussed above. So I share the voiced concerns to a great extent while acknowledging [the significance of real problems the new API is designed to solve](https://github.com/vuejs/rfcs/issues/55#issuecomment-504875870). Thankfully, it is made clear by Evan You and other members of the Vue core team that [the new function API is _not_ intended to replace the current object API](https://twitter.com/Akryum/status/1143114880960126976).

It is certainly amusing to witness how the leading frameworks are influencing one another and evolving together. This could be an overall win for the framework consumers like myself since the growing resemblance across competing solutions makes easier to switch from one to another as needed. Meanwhile, Vue may be risking losing what best distinguished itself from its major alternatives, especially React.

[As I wrote before](../whys-of-bobaekang-com), I strive to avoid marrying my favorite piece of technology of any given day whether it being a particular programming language or framework. That said, I wish the Vue project the very best. And as for me, it's time to continue learning more stuff!