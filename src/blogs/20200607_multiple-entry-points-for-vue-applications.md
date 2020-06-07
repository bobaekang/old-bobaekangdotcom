---
title: 'Multiple entry points for Vue applications'
tags: ['Vuejs', 'Reactjs', 'trick']
---

Recently, I came to find [this brilliant blog post](https://blog.logrocket.com/multiple-entry-points-in-create-react-app-without-ejecting/) introducing how to set up multiple entry points for a Create React App (CRA) project without ejecting. It's only a simple trick that is easy to implement yet solves a very real and concrete problem. How beautiful!

I won't copy-paste the original solution here--you should go read [the blog post](https://blog.logrocket.com/multiple-entry-points-in-create-react-app-without-ejecting/)! But the key idea is to have multiple entry points, i.e. root React application files, in a single CRA repo to share components (as well as dependencies and static assets) between multiple React applications and control which entry point to use to build an application with an environment variable. In a sense, this gives a monorepo without setting up [`lerna`](https://lerna.js.org/) or other solutions for complicated use cases.

The original blog's motivation to use this trick has to do with the limitation that, in order to set up multiple entry points (likely via webpack), we have to ["eject"](https://create-react-app.dev/docs/available-scripts/#npm-run-eject) from CRA to gain access to _lower level_ configurations (Babel, webpack, ESLint, etc.). While "ejecting" may be useful or even unavoidable at times, this is a one-way ticket and we cannot go back to a simpler CRA setup that keeps us from "configuration hell." Hence the title of the original blog post: "Multiple entry points in Create React App _without ejecting_."

But... Vue developers are not in the same shoes. Initializing a Vue application with [Vue CLI](https://cli.vuejs.org/) still exposes _lower level_ configurations. Specifically, [most webpack API is exposed](https://cli.vuejs.org/guide/webpack.html#working-with-webpack) via `configureWebpack` option in `vue.config.js`. So is the same trick still relevant to Vue applications?

For those webpack masters out there, maybe not so much. But I feel much more comfortable writing plain JavaScript to implement the logic for switching build targets conditionally than messing with webpack configuration. In fact, using custom environment variables in `.env` inside `webpack.config.js` to switch entry files requires more work than using `VUE_APP_*` environment variables, which are [made available for client-side code by Vue CLI out of the box](https://cli.vuejs.org/guide/mode-and-env.html#using-env-variables-in-client-side-code).

At least for the sake of ease-of-use, I believe the same multiple entry points trick is useful for Vue applications as well! In fact, this very trick would have been very helpful for [this project I worked on](../my-first-major-project-has-shipped), which included three Vue applications with many overlapping dependencies including a custom library for shared Vue components.

Enough of rambling. Here's the example code to implement the trick for two entry points to choose from, `/src/App.vue` and `/src/Test.vue`:

```js
/* src/main.js */
import Vue from 'vue'

Vue.config.productionTip = false

const BUILD_TARGETS = {
  app: './App.vue',
  test: './Test.vue',
}

const path = BUILD_TARGETS[process.env.VUE_APP_BUILD_TARGET] || './App.vue'

import(`${path}`).then(({ default: App }) =>
  new Vue({
    render: h => h(App),
  }).$mount('#app')
)
```

That's it. And the code is self-explanatory.

I also created [this GitHub repo](https://github.com/bobaekang/vue-multiple-entry-points) to demonstrate how to set up the multiple entry points trick for a Vue project. Feel free to check out the repo and share your feedback!
