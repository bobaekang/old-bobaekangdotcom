---
title: "In anticipation of Vue 3"
tags: ["Vuejs"]
---

Vue 3 has gone [alpha](https://github.com/vuejs/vue-next) in last January!

For me, the stable release for Vue 3 will mark one of the most anticipated events in 2020.[^1] After all, I got started with web development using Vue 2 and Vuetify in 2017, and while this blog is built with React and Gatsby, Vue is my go-to solution for building web applications at work. I love its well-managed ecosystem, gentle learning curve, and superb documentation.

[^1]: Other exciting events in 2020 for me include the releases of Go 1.14 (soon?), TypeScript 3.8 (likely [this month](https://github.com/microsoft/TypeScript/issues/34898)), R 4.0 (probably [this April](https://www.r-project.org/doc/R-SDLC.pdf)), Python 3.9 (likely [this October](https://www.python.org/dev/peps/pep-0602/)). Also, Node.js 14 is coming, so that's cool, and Deno seems very, very close to 1.0. Oh, and I can't wait to try out GitHub for mobile Andriod when it's finally out for everyone!

## Looking closely at the RFCs

The `vuejs/vue-next` repo README states:

> "At this stage, the only major work left is server-side rendering, which we are actively working on."

It sounds to me that new features coming to Vue 3 are all there. This means that we should be able to get a pretty good idea of what's coming by looking at the list of merged RFCs tagged `3.x`, which represent all the breaking changes from Vue 2 to Vue 3. There are 12 of them, from older to newer:

* [Replace v-bind's .sync with a v-model argument](https://github.com/vuejs/rfcs/pull/8)
* [Global API Treeshaking](https://github.com/vuejs/rfcs/pull/19)
* [Slots Unification](https://github.com/vuejs/rfcs/pull/20)
* [Functional and async components API change](https://github.com/vuejs/rfcs/pull/27)
* [Render function API change](https://github.com/vuejs/rfcs/pull/28)
* [Global mounting/configuration API change](https://github.com/vuejs/rfcs/pull/29)
* [Component v-model API change](https://github.com/vuejs/rfcs/pull/31)
* [Custom Directive API Change](https://github.com/vuejs/rfcs/pull/32)
* [Remove keyCode support in v-on](https://github.com/vuejs/rfcs/pull/95)
* [Remove filters](https://github.com/vuejs/rfcs/pull/97)
* [Remove inline-template ](https://github.com/vuejs/rfcs/pull/98)
* [<transition> API changes](https://github.com/vuejs/rfcs/pull/105)

When I saw this list, what stood out to me was that the list is missing [the Composition API RFC](https://github.com/vuejs/rfcs/pull/78)! So I dug a little deeper into the RFC repo and found that the Composition API RFC is targeting both 2.x and 3.x versions, which means that future 2.x will also be getting the Composition API supported natively as opposed to via [a plugin](https://github.com/vuejs/composition-api).

In other words, the list above includes _only_ the breaking changes. To get the full picture, we should check out [all the merged RFCs under `/active-rfcs`](https://github.com/vuejs/rfcs/tree/master/active-rfcs). Note that some of the first RFCs have already landed in v2.6, including [the new slot syntax](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0001-new-slot-syntax.md) as well as [the slot shorthand](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0002-slot-syntax-shorthand.md).

In the following, I'd like to jot down some personal thoughts on a few merged RFCs that are most interesting to me.

## Composition API

* [RFC README text](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0013-composition-api.md) for Composition API

I followed many discussions on upcoming Vue 3 throughout 2019, including the one on initially controversial RFC for the new composition API. In fact, I briefly touched upon the discussion on the composition API [back in June 2019](../the-first-look-into-react-from-my-point-of-vue) when the RFC was called the "function" API. At that time, I was still in favor of the familiar options API of Vue 2.x, which I referred to as (in hindsight, _mistakenly_) more "declarative" than the composition API.

Well, six months went by, and I must admit that I'm now sold on the idea of the Composition API. This might be partly due to the fact that I have been tinkering with this very blog for a few months, writing and rewriting its functional React components. Plus, the Vue team has done [a fantastic job](https://composition-api.vuejs.org/) in communicating clearly the motivation as well as the value of the Composition API.

In addition, I recently [got started with TypeScript](../minimal-typescript-project-setup). And one of the pros of the new Composition API is that it plays much nicer with TypeScript compared to the 2.x "options" API since the new API is largely based on simple JavaScript functions. Now that I'm more experienced with static types via Go and TypeScript (and also Haskell ... sort of😂), being able to easily integrate them into Vue project is an exciting prospect.

## Removing filters

* [RFC README text](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0015-remove-filters.md) for removing filters

Though I have never been an avid user of filters, I do appreciate its Unix-pipe-inspired syntax that allows me to read the code from left to right.[^2] Other than the syntax, however, filters don't offer anything truly distinct from what methods can do, so I am OK with this.

[^2]: Somewhat off the topic, but this is why I still fall back to `dplyr` with its `magrittr` forward-pipe operator (`%>%`) when working on data manipulation in R even though `data.table` gives me more power. Ad hoc function composition via pipes is indeed a powerful thing.

One interesting cited motivation for removing pipe is the possibility of native JavaScript [Pipeline Operator](https://tc39.es/proposal-pipeline-operator/), which is currently a stage 1 proposal.[^2] It would be really cool to see it landing in a future ECMAScript language spec, but considering [the process](https://tc39.es/process-document/) as well as the fact that the Pipeline Operator proposal has been out there for a while with little progress, it may not be coming anytime soon.

## Simplified functional components

* [RFC README text](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0007-functional-async-api-change.md) for simplified functional components

Again, I don't write a lot of functional components in my projects. This is partly because using Vuetify components, most of which seem to be stateful, often made it difficult for me to get it right. Nonetheless, I do like that it offers an option for me to write more lightweight components without the cost of reactivity, and I strive to take advantage of them whenever possible. Indeed, using functional components was a well-known performance optimization trick in Vue 2.

That said, what helped me to use functional components in the past was the ease of turning single file components (SFCs) into functional components: simply add "functional" after the root `<template>` opening tag, and you're done![^3] Well, sadly, with the "simplified" functional components, this is no longer available.

[^3]: This was first made available with Vue 2.5, which was released soon after I got introduced to Vue. So I pretty much always had this option.

The good news is, as stated in the RFC, that "the performance difference between stateful and functional components has been drastically reduced and will be insignificant in most use cases." So, functional components in Vue 3 simply means that the components are stateless, i.e., no reactivity. No more, no less. I think this simplifies the mental model as well since "functional components" is no longer something special.

## Anticipating Vue 3

Now that all the major changes are implemented and ready for testing, we are all free to give it a try. The question is, will I? Maybe not just yet.

I do need a front-end web app for this year's project at work, so I will probably try to use the Composition API via a plugin with Vue 2.x and TypeScript. If I am to be safe, I won't be migrating to Vue 3.x until at least 3.1 is released. But I will certainly keep it in mind and write the code to facilitate that eventual migration from Vue 2.x to 3.x. Hopefully, that time comes before this summer so that I have enough time to complete the migration before the project deadline.

Outside of my work, I'm making conscious efforts to practice React (_sans_ Redux). However, with React Hooks and Vue Composition API, these two frameworks are getting ever so close to each other. So I believe practicing React will also help to get prepared for Vue 3 to some extent.

Anyhow, I am pretty pumped up to see Vue 3 in 2020 and I know that many Vue users feel the same way. Kudos and congratulations to the Vue team!