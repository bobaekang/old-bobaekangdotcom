---
title: "Minimal TypeScript setup for curious minds"
tags: ["learn", "TypeScript", "trick"]
---

Well, this is awkward.😬

I have to admit that I spoke too soon when I suggested in [the last post](../here-i-go-finally) that I'll be focusing on Go in 2020. I'd like to confess that I have spent the first half of January mostly trying TypeScript to practice building simple apps. Here is my excuse: this was part of my exploration regarding what technology stack to choose for this year's project at work. The project is still at its early stage and I am responsible to compare and evaluate different options to ensure the quality and maintainability of the production app.

So, after trying out Go, I turned to Typescript. This is not to say that I'm ditching Go once and for all. In fact, trying out TypeScript helped me to better appreciate the reletive strengths of both Go and TypeScript. But I will save that discussion for a later post.

Here, instead, I would like to share what I find to be sensible and useful as an initial project setup for building a Node.js app with TypeScript.

## Caveat

Before I go any further: I'm still very new to TypeScript and its ecosystem. What I present in this post is based on my own limited experience and exploration, which may not be fully aligned with the "best practices"  recommended in the Node.js and TypeScript communities.

In fact, countless more templates, boilerplates, and starter packs are out there for building a Node.js app with TypeScript, many created by individuals and teams infinitely more talented than I. For one, Microsoft, who created TypeScript, maintains a GitHub repo called [`microsoft/TypeScript-Node-Starter`](https://github.com/Microsoft/TypeScript-Node-Starter), which showcases "a good end-to-end project setup" with a production-grade configurations for an Express app.

Again, what I'm laying out in this post is what I find to be useful for getting started with TypeScript and hacking around for learning purposes. As the title suggests, I am sharing this setup for curious minds, not experts working on serious projects.

Alright now, let's dig in.

## First steps

Of course, the first step is to create a project directory and initialize it:

```shell
mkdir minimal-typescript-setup
cd minimal-typescript-setup

npm init --yes
```

I'm skipping Git here, but feel free to set it up.

The next step is to add TypeScript to the project. Obviously! In addition to TypeScript itself, we will also install [`ts-node`](https://github.com/TypeStrong/ts-node), a "TypeScript execution and REPL for Node.js." This is basically Node.js and TypeScript compiler put in a single package to allow us to "skip" the compilation step and directly execute `.ts` scripts.

```shell
npm install --save-dev typescript ts-node
```

Node.js does not provide type definitions for its core and standard library. Why would it? After all, it's a runtime for JavaScript. Which means that, to use Node.js with TypeScript properly, we need to provide quality type definitions for Node.js. So let's add them. Type definitions for Node.js built-in modules are available via `@types/node`, which is provided by [DefinitlyTyped](http://definitelytyped.org/), "the repository for _high quality_ TypeScript type definitions" for numerous `npm` packages as well as Node.js modules.

```shell
npm install --save-dev @types/node
```

## Configuring TypeScript

Now that we have the bare minimum for using TypeScript with Node.js, let's do some configuration for TypeScript compiler. This is achieved by adding a [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) file at the project root. While we can manually create a `tsconfig.json` file, let's use what TypeScript recommands as the default by running the following command:

```shell
npx tsc --init
# alternatively: ./node_modules/.bin/tsc --init
```

This creates in the project root a `tsconfig.json` file that includes a lot of configuration options, mostly commented out except a few. And we will make some changes soon.

The first change involves separating the compiled JavaScript code and the TypeSCript source code by putting the former in the `/dist` folder and the latter in the `/src` folder:

```
/
/dist   <- where generated .js code will go
/src    <- where the .ts source code lives
```

To achieve this, we need to specify two compiler options in `tsconfig.json`, namely "outDir" and "rootDir":

```json
/* tsconfig.json */
{
  "compilerOptions": {
    // ...
    "outDir": "./dist",
    "rootDir": "./src",
    // ...
  }
}
```

While we are at it, lets add some npm scripts to reflect this file structure. We will add three scripts: 1) "build" for compiling TypeScript source code into JavaScript, 2) "serve" for running TypeScript source code directly for development using `ts-node`, and 3) "start" for running the compiled JavaScript code in Node.js.

```json
/* package.json */
"scripts": {
  "build": "tsc --build",
  "serve": "ts-node ./src",
  "start": "node ./dist"
}
```

The second change to the TypeScript configuration is to specify the ECMAScript dialect supported by our target Node.js version in order to simplify the compilation step and save time. As of this writing, I have Node.js 10.x installed on my Windows laptop, which supports all ES2018 features. So I would add the following options to `tsconfig.json`:[^1]

```json
/* tsconfig.json */
{
  "compilerOptions": {
    // ...
    "lib": ["ES2018"],
    "target": "ES2018",
    // ...
  }
}
```

[^1]: Check out [this Wiki page](https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping) on `microsoft/TypeScript` repo for recommended settings for other Node.js LTS versions.

## Linting and formatting with ESLint + Prettier

While linting and formatting are not required for TypeScript code to compile and run, they are certainly part of the best practices for Node.js development workflow. Following the best practices helps our project to be more accessible and acceptable to the community at large, right?

The _de facto_ standard for JavaScript linter is, of course, [ESLint](https://eslint.org/). But our source code is in TypeScript, so what do we do? It seems that, until recently, the community largely coalesced around a separate project called [TSLint](https://github.com/palantir/tslint) as an alternative solution. Then, early in 2019, the project announced that TSLint will be gradually deprecated in favor of a better integration with ESLint through a plugin called [`typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint).

So, let's add ESLint with `typescript-eslint` plugin.

```shell
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

While we are at adding dependencies, let's add our favorite formatter, too: [Prettier](https://prettier.io/).

```shell
npm install --save-dev --save-exact prettier
```

And, of course, we need more dependencies to integrate Prettier with ESLint.😅

```shell
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

Now we have all the ingredients. Let's create the configuration file for ESLint, `.eslintrc.js`, and specify the setup:[^2]

[^2]: The configuration for `typescript-eslint` is based on [this instruction page](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md) from its official GitHub repo.

```js
/* .eslintrc.js */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
}
```
And set some formatting rules for Prettier in `.prettierrc.js`:[^3]

[^3]: The formatting rules I specified here are based on my personal taste. Feel free to alter them according to yours!

```js
/* .prettierrc.js */
module.exports = {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
}
```

Lastly, let's make a "lint" npm script to make it easier to lint and format our code. In the script, we will also include `tsc --noEmit` for typechecking before running ESLint for actual linting and formatting:

```json
/* package.json */
"scripts": {
  // ...
  "lint": "tsc --noEmit && eslint \"**/*.ts\" --quiet --fix",
  // ...
}
```

We can then also make the `npm run lint` command part of, say, the "build" script or the "serve" script although I'm going to skip that here.

## Testing with mocha

I'll be honest. Until recently, I have never really incorporated any testing into my development workflow. In fact, this only changed when I started working with Go, which offers testing out of the box. I am yet to work on any serious project in Go, but the way Go has made testing pretty much a language feature encouraged me to finally get my hands dirty and overcome my test-phobia.

Enough of rambling.

In the JavaScript/TypeScript ecosystem, there seem to be two prominant choices for testing: [`mocha`](https://mochajs.org/) and [`jest`](https://jestjs.io/). Between the two, `jest` seems to be a more comprehensive, "just works" solution bundled with just about anything you need for implementing tests. `mocha`, on the other hand, is a basic and flexible test framework that leaves actual implementation of tests (assetion, mocking, etc.) to its users.

This post is definitely not for an in-depth comparison between these two. I don't even have much relevant experience to do so. I will only say that `mocha` seems to be a more suitable choice for a "minimal" setup. So that's what we're adding to this project:

```shell
npm install --save-dev mocha @types/mocha
```

While we are at it, let's also edit the "test" script to use `mocha`:

```json
/* package.json */
"scripts": {
  // ...
  "test": "mocha -r ts-node/register **/test/**/*.test.ts"
}
```

As the script suggests, test files will be living inside the `/test` folder and their filenames suffixed by `.test.ts`.

Turns out, the TypeScript compiler does not like it when there are `.ts` files outside the source code root directory as specified by the "rootDir" option in `tsconfig.json`. While `npm run test` (using `mocha`) and `npm run serve` (using `ts-node`) commands will work just fine, `npm run lint` and `npm run build` will fail. To fix this issue, we need to tell the TypeScript compiler that files in `/test` are in fact not part of the build. This is achieved by specifying paths to "exclude" in `tsconfig.json`:

```json
/* tsconfig.json */
{
  "compilerOptions": {
    // ...
  },
  "exclude": [
    "./test"
  ]
}
```

Now the TypeScript compiler knows to ignore files inside `./test` and will happily build the project.

## Giving it a go

OK, we are finally ready to write some TypeScript. To keep it short and sweet, let's just build a simple yet totally original HTTP server that displays a greeting statement on page:

```ts
/* src/index.ts */
import http from 'http'
import { greet } from './greet'

http
  .createServer((req, res: http.ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.write(greet('Bobae'))
    res.end()
  })
  .listen(8080)

console.log('Server running at port 8080')
```

```ts
/* src/greet.ts */
export function greet(name: string): string {
  return `Hello, ${name}!`
}
```

And, like good developers that we are, let's write a test for the `greet` function:

```ts
/* test/greet.test.ts */
import assert from 'assert'
import { greet } from '../src/greet'

describe('greet', () => {
  it('should return a greeting statement', () => {
    const actual: string = greet('Bobae')
    const expected: string = 'Hello, Bobae!'

    assert.equal(actual, expected)
  })
})
```

Fantastic. Now that we have some code to play with, go ahead and have fun! Try editing and linting the source code, running tests, compiling the source code to JavaScript, and spinning up a friendly HTTP server!🎉

By the way, in case you're interested, I have created [this GitHub repo](https://github.com/bobaekang/minimal-typescript-setup) containing everything I discussed in this post. Feel free to take a look around the source code and step-by-step commit history, clone and fork the repo to try it out, and [open Issues](https://github.com/bobaekang/minimal-typescript-setup/issues) to share your suggestions for improvements.

## Wrapping up

So there we have, a minimal Node.js project with TypeScript setup for curious minds to play around. Here I tried to be a bit more than _the absolute bare minimum_ so that this setup can also serve as a stepping stone for building an actual project if needed. In my (extremely biased) view, this setup has a potential to be an inviting playground for anyone to get their hands dirty and pick up the basics of TypeScript to build a Node.js app. It surely helped me to get started and feel more comfortable with exploring TypeScript for my project. 

And I certainly hope it helps you, too!

