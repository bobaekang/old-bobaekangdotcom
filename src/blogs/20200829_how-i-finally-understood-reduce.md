---
title: 'How I finally understood .reduce()'
tags: ['JavaScript', 'learning']
---

One of my favorite features of the JavaScript language is the trio of `.map()`, `.filter()`, and `.reduce()`.[^1] Combined with the arrow function syntax,[^2] these built-in array methods make it easier for me to approach programming as building pipelines, i.e. series of function applications, for data to flow through. The analogy of programming as building data pipelines particularly resonates with me--my first introduction to programming was via data analysis using R (with `dplyr` and its friends) and Python (with `pandas`), where one of the most common tasks is transforming, or "wrangling", a data frame by letting it pass through a series of functions or methods.

[^1]: I first thought that these array methods were introduced in ES6, or ES2015, along with arrow function syntax and many others. Turns out, they have been part of JavaScript since ES5. This is both surprising and interesting to me because I've seen many articles introducing these methods in the context of learning ES6.
[^2]: This got to be the most terse syntax for lambda function in all mainstream programming languages and I love it for that.

Looking back, however, learning to think in terms of `.map()`, `.filter()`, and `.reduce()` was not a straightforward path for me--especially `.reduce()`! This is partly thanks to the extreme flexibility of `.reduce()`, which can return almost anything unlike `.map()` or `.filter()` that gives back an array, just as in common data wrangling tasks that start with a data frame and end with a new data frame. Unfortunately, the initial explanations I encountered while dabbling with Haskell--don't ask me why 😅--didn't serve me right. Most explanations on `fold` for Haskell beginners rely on simple examples like "folding over" a list (i.e. array) of numbers to get a single number that is the total sum. While making sense, these (understandably) simplistic examples didn't really give me an insight into what `fold`, or `reduce`, is capable of.

It was getting into Redux that allowed me to grok `.reduce()` at last. In the context of Redux, a reducer is a function that takes a state and an action and returns a new state:[^3]

```
(previousState, action) => nextState
```

[^3]: https://redux.js.org/basics/reducers

And this function is called reducer because it "reduces" two terms (state and action) into a single term (state)!

When I came to this insight, something clicked in me and I finally began to understand the power of `(previousState, currentValue) => nextState`, which is roughly the signature of a reducer function in `.reduce()`. Here, I think the name "accumulator" often found in many other places, including [the MDN page on `Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce), can be a sort of mental blocker. Even `previousValue` in the type signature for a reducer in TypeScript (as in VS Code IntelliSense)[^4] seems not as intuitive for the uninitiated since the `previousValue` and `currentValue` types can differ. Thinking in terms of "state", in my view, better illustrates what a reducer is about.

[^4]: `(previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any`

Case in point: one of the most common use case for `.reduce()` in my own work is turning a simple array into an object or a simpler object to a more complex object. For example:

```js
const words = ['foo', 'bar', 'baz']
const wordLength = words.reduce(
  (prevState, word) => ({ ...prevState, [word]: word.length }),
  {}
) // { foo: 3, bar: 3, baz: 3 }
```

In this rather contrived example, `words` is an array of string and `wordLength` is an object where each key is an element of the `words` array and its value the length of that element. Here, the initial "state" is an empty object, and as we work through the array, element by element, we get a new "state" with one more key-value pair.

Given the flexibility of `.reduce()`, it is possible to encode a more complicated transformation, such as:

```js
const words = ['foo', 'bar', 'baz', 'fooBar', 'fooBaz', 'barBaz', 'fooBarBaz']
const wordLengthOverFiveCharsOnly = words.reduce(
  (prevState, word) =>
    word.length > 5 ? { ...prevState, [word]: word.length } : prevState,
  {}
) // { fooBar: 6, fooBaz: 6, barBaz: 6, fooBarBaz: 9 }
```

This time, the reducer function clearly tells us that the "state" changes only if the word is longer than five characters. And the result is equivalent to first running the original array through `.filter((word) => word.length > 5)` and then calling `.reduce((prevState, word) => ({ ...prevState, [word]: word.length }), {})`, i.e. the key-value pair of word and the length of that word but only for words longer than five characters. But this way, we are looping through the array only once!

Yes, the possibilities are infinite. But the real point here is that `(prevState, currentValue) => nextState` is a better description of the work of the reducer function in `.reduce()` than `(accumulator, currentValue) => ?` or `(previousValue, currentValue) => ?`. The name `accumulator` makes it unclear what I'm getting as a return value at each step--the next stage of the same accumulator maybe? But what is it accumulating? Meanwhile, `previousValue` (mis-)leads me to think that it is of the same type as the values in the array. On the other hand, although the example above used an object, a state can really be anything: a primitive, an array, an object, etc. And, conceptually, nothing suggests that this state has anything to do with what the value looks like.
