---
title: "Faking immutability in JavaScript"
---

As I continue my study of functional programming, I also try to bring its key ideas into my own projects.

Immutability is one such idea. Put simply, immutability means never directly altering data while operating on them. Instead, we generate new data that represent the output of the given operation on the given input data. This is what function application is all about.

When data are immutable, it becomes easy to reason about what our program is doing to them because each expression always gives back the same result. No side effects, no surprises.

Anyhow, while refactoring my own projects, I came to notice that the destructing assignment syntax in JavaScript is a great tool for implementing simple immutability. (But with a catch!)

Well, let me share an refactoring example.

## Original code

I found in my project some code that changes some property values of an object based on some conditions involving the old property values.

To make it simple, let's say that I have an object called `myObj` with one property, `myProp`, that has some value.

```js
const myObj = {
    myProp: /* some value */
}
```

Then I have a function that basically checks if `myProp` needs change and give new value to `myProp` if the condition is `true`. 

```js
const myFunction = obj => {
  if (/* some condition to check if obj.myProp needs change */) {
      obj.myProp = /* some operation on myProp that gives a new value */
  }
}
```

Pretty straightforward.

In this code, however, a property of `myObj` is directly accessed and altered. Calling `myFunction` can surprise me if this is not the first time I'm calling it, thus making the program a bit harder to reason about.

## A simple fix with `Object.assign`

One quick fix to this would be creating a new object inside our function, say `newObj`, and apply operations that could alter the properties to `newObj` instead of to the original input object. The function then returns `newObj` at the end, thus keeping the original input unaltered.

```js
const myFunction_1 = obj => {
  const newObj = Object.assign({}, obj)

  if (/* some condition */) {
      newObj.myProp = /* some operation on myProp that gives a new value */
  }

  return newObj
}
```

Here, `Object.assign` takes two inputs, i.e. target and source objects, and copies over the properties of the source object to the target.[^1] In this case, the target is an empty object `{}`, so the final result of `Object.assign` is a copy of the source, i.e. the function argument named `obj`. 

[^1]: Full description on `Object.assign` can be found [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

While I'm at it, I may as well extract the change operation and make it into a function:

```js
const myFunction_1 = obj => {
  const newObj = Object.assign({}, obj)

  if (/* some condition */) {
    newObj.myProp = changeMyProp_1(newObj.myProp)
  }

  return newObj
}

const changeMyProp_1 = myProp => /* returns new myProp value */
```

This way, the output of `myFunction_1` should be separate from the input, thus retaining some degree of immutability.

## Getting fancy with object destructuring

Modern JavaScript provides highly intuitive ways to unpack objects and arrays. For those interested in a comprehensive treatment on this subject, I recommend reading [the "Destructuring assignment" article on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).

With object destructuring, I can do the following:

```js
const myFunction_2 = obj => ({
  ...obj,
  ...changeMyProp_2(obj)
})

const changeMyProp_2 = ({ myProp }) =>
  /* some condition */ ? { myProp: /* new myProp value */ } : {}
```

Here, `myFunction_2` creates and returns a new object that has a copy of all properties from the input, where `changeMyProp_2` may overwrite the original `myProp` value with a new value if the condition is `true`. 

Although both `myFunction_1` and `myFunction_2` accomplish the same thing, in my view, `myFunction_2` is a lot cleaner and closer to the original intent than `myFunction_1`. There is no itermediate object to be created and manipulated. Instead, `myFunction_2` simply gives the result of the operations.

Also, I like how `changeMyProp_2` takes care of both cases of condition evaluting to `true` and `false`. To be fair, `changeMyProp_1` could be rewritten to include the condition checking as well--it would simply return the original `myProp` value if the condition evaluates to `false`.

## So, what's the catch?

Unfortunately, either `Object.assign` or the object destructuring with the spread operator `...` _falls short_ when it comes to getting immutability right.

This is because `Object.assign` only makes a _shallow_ copy of the source properties. To quote [the MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Deep_Clone):

> "If the source value is a reference to an object, it only copies that reference value."

Here is a simple illustration of this shortcoming:

```js
const obj1 = {
    foo: {
        bar: 1
    },
    baz: [1, 2, 3],
    // ... and more
}

const obj2 = Object.assign({}, obj1)

obj1.foo.bar = 2 // this will also change obj2.foo.bar to 2
obj1.baz.push(4) // this will also change obj2.baz to [1, 2, 3, 4]
```

And we face the same limitation when using destructuring assignment to make a copy.

That said, if we know in advance which properties require _deep_ copy, destructuring assignment provides a relatively simple and unified syntax for retaining immutability:

```js
// using the same obj1 as before

const obj2 = {
  ...obj1,
  foo: { ...obj1.foo },
  bar: [...obj1.bar]
}
```

Of course, the higher the level of nesting is, the less effective this strategy will be. At that point, one should consider a more robust solution for persistant data strcuture such as [Immutable.js](https://github.com/immutable-js/immutable-js).


## Comparisons to other languages I use

Instead of a conclusion, I'd like to draw brief comparisons between JavaScript and two other languages I'm most familiar with: Python and R.

### Python

JavaScript object and array roughly correspond to Python dictionary and list, respectively.

To my knowledge, Python has supported destructuring, or unpacking, a list with `*` operator since version 3.0 ([PEP 3132](https://www.python.org/dev/peps/pep-3132/)). And Python version 3.5 added support for destructuring dictionaries with `**` ([PEP 448](https://www.python.org/dev/peps/pep-0448/)).

```python
# for lists
newList = [ *list1, *list2]

# for dictionaries
newDict = { **dict1, **dict2 }
```

Perhaps the most common use cases for `*` and `**` involve using `*args` and `**kwargs` in function defintions for unpacking parameters.

Making copies of dictionaries with destructuring assignment in Python suffers from the same pitfall. For instance:

```python
# dict1['a'] and dict2['a'] point to the same list object
dict1 = { 'a': [1, 2, 3] }
dict2 = { **dict1 }

dict1['a'].append(4) # dict2['a'] is now [1, 2, 3, 4] as well
```

### R

Roughly speaking, JavaScript object and array correspond to R list and vector, respectively.

Assignment in R relies on pass-by-value rather than pass-by-reference. Due to R's lazy evalution, however, the passed "values" are often expressions waiting to be evaluated. And R makes actual copies of an object only when some modifications are applied to the object at which point the expression is forced to be evaluated. In practice, this "copy-on-modify" behavior in R gives immutabiltiy because any operation on an object would make a copy.[^2]

[^2]: See [this StackOverflow discussion](https://stackoverflow.com/questions/15759117/what-exactly-is-copy-on-modify-semantics-in-r-and-where-is-the-canonical-source) for more on this point.

Thanks to this immutability-by-default nature of R, I do not see much need for destructuring assignment. This is because my key use case for it so far has been to quickly get immutability where it is not a default option--the subject of the curret post.

That said, I have often organized multiple objects into a single list to work with and destructuring assignment would have been a nice thing to have there. Though I have not tried it myself, [the `zeallot` package](https://github.com/r-lib/zeallot) seems to offer a nice solution for destructuring assignment with a custom operator `%<-%`. 
