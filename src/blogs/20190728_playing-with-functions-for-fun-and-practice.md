---
title: "Playing with functions for fun and practice"
---

I have been familiarizing myself with functional programming through the Haskell language. All the while, I am also realizing that JavaScript, especially since ES6, also supports many functional programming features.[^1] 

[^1]: Here, [Eric Elliot's Composing Software series](https://medium.com/javascript-scene/composing-software-the-book-f31c77fc3ddc) is a godsend! Though I didn't read it through, [Luis Atencio's Functional Programming in Javascript](https://www.manning.com/books/functional-programming-in-javascript) also seems like a good resource.

In fact, the ES6 arrow function syntax `x => expression` seems almost as FP-friendly as that of [Haskell's anonymous function](https://wiki.haskell.org/Anonymous_function), `\x -> expression`. Compare that to Python's `lambda x: expression` or R's `function(x) expression`! 😏

This FP friendliness of JavaScript, of course, is an exciting news, since my current project is all about JavaScript. For the sake of fun and practice, I did a little experiment with a simple JavaScript function I wrote, `arr2table`.

## Problem statement

`arr2table` is a function that creates a table in HTML from an array of objects that represent table rows. Each object has four props corresponding to four columns and their values (name, type, definition, and values). The resulting table is meant to serve as a sort of "data dictionary" for a tabular dataset.

An example array looks like the following:

```javascript
const arr = [
  {
    name: 'fullname',
    type: 'str',
    definition: 'Full name of the person',
    values: ''
  },
  {
    name: 'female',
    type: 'bool',
    definition: 'Indicator that the person is female',
    values: 'true|false'
  },
  {
    name: 'age',
    type: 'int',
    definition: 'Age of the person',
    values: '0-100'
  },
  /* some more rows... */
]
```

The the output should look something like the following:

```html
<table>
  <thead>
    <!-- Column names are capitalized  -->
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Definition</th>
      <th>Values</th>
    </tr>
  </thead>
  <tbody>
    <!-- Each object becomes a row -->
    <tr>
     <td>fullname</td>
     <td>str</td>
     <td>Full name of the person</td>
     <td></td>
    </tr>
    <tr>
     <td>female</td>
     <td>bool</td>
     <td>Indicator that the person is female</td>
     <td>true|false</td>
    </tr>
    <tr>
     <td>age</td>
     <td>int</td>
     <td>Age of the person</td>
     <td>0-100</td>
    </tr>
  </tbody>
</table>
```

Of course, the real output does not need comments, linebreaks, or indentations. Browsers don't care.

## Original solution

So, here is the original `arr2table` function I wrote weeks ago with minor modifications:

```js
/* original */
function arr2table(arr) {
  const cols = ['name', 'type', 'definition', 'values']
  const rows = arr
  
  let thead = ''
  let tbody = ''
  
  cols.forEach(col => {
    thead += '<th>' + col[0].toUpperCase() + col.slice(1) + '</th>'
  })
  
  rows.forEach(row => {
    tbody += '<tr>'
    cols.forEach(col => {
      tbody += '<td>' + (row[col] ? row[col] : '') + '</td>'
    })
    tbody += '</tr>'
  })
  
  return (
    '<table><thead><tr>' +
    thead +
    '</tr></thead><tbody>' +
    tbody +
    '</tbody></table>'
  )
}
```

I think the code is more or less self-explanatory. It's a simple function after all.

## First tweak: template literals

The first change I tried was basically replacing string concatenations with `+` operators with template literals. Here is the code:

```js
/* use template literals */
const arr2table_1 = arr => {
  const cols = ['name', 'type', 'definition', 'values']
  const rows = arr
  
  let thead = ''
  let tbody = ''
  
  cols.forEach(col => (
    thead += `<th>${col[0].toUpperCase()}${col.slice(1)}</th>`
  ))
  rows.forEach(row => {
    tbody += '<tr>'
    cols.forEach(col => (
      tbody += `<td>${(row[col] ? row[col] : '')}</td>`
    ))
    tbody += '</tr>'
  })
  
  return (
    `<table><thead><tr>${thead}</tr></thead><tbody>${tbody}</tbody></table>`
  )
}
```

This, of course, has little to do with functional programming. But it still makes the code somewhat shorter and sweeter, at least for me.

## Maps for immutability

Now let's try something real. Immutability is one of the key elements of functional programming. In functional programming, we take an input and generate an output, instead of manipulating the input directly.

Following the spirit of immutability, I replaced `.forEach()` array methods with `.map()`s:

```js
/* replace forEach with map */
const arr2table_2 = arr => {
  const cols = ['name', 'type', 'definition', 'values']
  const rows = arr
  
  const thead = cols
    .map(col => (`<th>${col[0].toUpperCase()}${col.slice(1)}</th>`))
    .join('')
  const tbody = rows
    .map(row => `<tr>${cols
      .map(col => `<td>${row[col] ? row[col] : ''}</td>`)
      .join('')
    }</tr>`)
    .join('')
  
  return (
    `<table><thead><tr>${thead}</tr></thead><tbody>${tbody}</tbody></table>`
  )
}
```
This helped me to avoid directly mutating values of `thead` and `tbody`. Because the output of `.map()` is still an array, I added `.join()` to get the final, concatenated string.

Removing scoped variables to mutate also presents a chance to break `arr2table_2` into smaller functions.

```js
/* separate functions for building thead and tbody */
const arr2table_2a = arr => {
  const cols = ['name', 'type', 'definition', 'values']
  const rows = arr
  
  return `<table><thead><tr>${
    getThead(cols)
  }</tr></thead><tbody>${
    getTbody({ cols, rows })
  }</tbody></table>`
}

const getThead = cols => cols
  .map(col => (`<th>${col[0].toUpperCase()}${col.slice(1)}</th>`))
  .join('')

const getTbody = ({cols, rows}) => rows
  .map(row => `<tr>${cols
    .map(col => `<td>${row[col] ? row[col] : ''}</td>`)
    .join('')
    }</tr>`)
  .join('')
```

The result is not quite function composition in a proper sense. But it is still a composition of sort in a sense that a problem is broken down to smaller problems, a solution is provided to each small problem, and those solutions are combined to generate a solution to the original problem.

By the way, if I wanted to push just a bit further, I could remove local variables in `arr2table_2a` altogether:

```js
/* remove all local variables */
const arr2table_2b = (arr, cols = ['name', 'type', 'definition', 'values']) =>
  `<table><thead><tr>${
    getThead(cols)
  }</tr></thead><tbody>${
    getTbody({ cols, rows: arr })
  }</tbody></table>`
```

`arr2table_2b` takes advantage of the default parameter value in the function definition for columns. In fact, `arr2table_2b` is more flexible than others as it provides an option to provide different column names.[^2]

[^2]: Of coursse, in order not to break the code, I would also have to make sure that the provided column names match the object properties of `arr` elements.

## Bring them all FP tricks

At this point, I wanted to try the most "functional" code I could write using techniques like currying, partial application, and proper function composition. I've read a fair bit of functional programming stuff over the last couple of weeks. Gotta flex that FP muscles, right? 😎

The following is what I came up with:

```javascript
/* try fp tricks */
const arr2table_3 = (arr, cols = ['name', 'type', 'definition', 'values']) =>
  getTable({ cols, rows: arr })

// table
const getTable = compose(
  useTag('table'),
  ({ cols, rows }) => `${getThead(cols)}${getTbody({ cols, rows })}`
)

// thead
const getThead = compose(
  useTag('thaed'),
  useTag('tr'),
  mapJoin(compose(useTag('th'), capitalize))
)

// tbody
const getTbody = compose(
  useTag('tbody'),
  ({ cols, rows }) =>
    mapJoin(row =>
      compose(
        useTag('tr'),
        mapJoin(cols => useTag('td')(row[cols] ? row[cols] : ''))
      )(cols)
    )(rows)
)

// utils
const capitalize = str => `${str[0].toUpperCase()}${str.slice(1)}`
const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x)
const mapJoin = f => strArr => strArr.map(str => f(str)).join('')
const useTag = tag => str => `<${tag}>${str}</${tag}>`
```

`arr2table_3` is now a thin wrapper over `getTable`, which does all the heavy lifting and is also a sort of wrapper over `getThead` and `getTbody`, now rewritten as compositions of utility functions.

Here, `compose` function is borrowed from [Eric Elliot's amazing "Composing Software" series](https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983). `compose` makes possible proper function composition where `compose(f, g)` would apply "`f` after `g`" to its argument.[^3]

[^3]: By the way, function composition is baked into Haskell's syntax. To compose `f` and `g`, you would write `f . g`. How elegant!

And `mapJoin` and `useTags` are my humble inventions.

`mapJoin` takes a function `f` and returns a function. This new function takes an array of strings, maps `f` over its elements, and concatenate the transformed strings into one large string. For instance:

```js
const mapJoinUpperCase = mapJoin(str => str.toUpperCase())
mapJoinUpperCase(['Hello', 'World'])
// returns 'HELLO WORLD'
```

`useTags` takes a string for a tag to use and returns a function that takes a string and returns a new string where its input is surrounded by the HTML tags of choice. For example:

```js
const useDiv = useTags('div')
useDiv('Hello World')
// returns '<div>Hello World</div>'
```

The code works. But to be honest, it looks like an overengineered nonsense. This feels especially true for the second function in `compose` for getting `getTbody`, which consists of two layers of `mapJoin` and a `compose` in itself. Creating four utility functions also seems to me a wasted effort although they may find uses in other parts of the application.

## How about performance?

I did not intend this whole practice of refactoring the original `arr2table` to be the work of optimizing its performance. But why not? Let's see how the new functions do.

The following is the code I wrote for simple benchmarking:

```js
/* benchmarking script */

const arr = [ /* has n rows */ ]

const benchmark = f => label => (num = 100) => {
  console.time(label)
  for (let i = 0; i < num; i++) f(arr)
  console.timeEnd(label)
}

benchmark(arr2table)('original')()
benchmark(arr2table_1)('template literals')()
benchmark(arr2table_2b)('maps')()
benchmark(arr2table_3)('maximum fp?!!')()
```

And the result was, well, interesting.

First, with a small array with only 10 rows, the "template literals" version was often as 2x as fast than the original. Disappointingly, all other versions were much worse than the original. In fact, the "maps" version was ~2x slower and the last "fp" version, ~4x slower!

Then I tried a moderately larger array with 1K rows. The rank did not change, but the proportion did. The "template literals" one was still the fastest, but only mildly (~10%) faster than the original. The "maps" version was still ~2x slower, but the "fp" version caught up a little (~3x slower).

A truly interesting thing happened with a large array with 100K rows. While the original and "template literals" versions showed no practical difference any more, the "maps" version rose to the top, almost 40% faster than them! The "fp" version was also doing much better, ~20% faster than the original.

## Wrapping up

The whole experiment seems to tell me that, for a small project, I might not gain much raw performance out of selectively applying functional programming techniques. Function calls can be rather costly!

Nonetheless, building an application is not solely about raw performance. [Maintainability and readability count.](https://www.codereadability.com/performance-cost-javascript-function-call-and-foreach/)

In my project, I rarely need a table with more than 30 rows. A simple switch to template literals will suffice. The "maps" version with helper functions is good, too. The code is more concise and flexible while the performance cost is negligible in absolute terms. All things considered, `arr2table_2b` is the best choice to me.