---
title: 'In search of CRA alternatives'
tags: ['Reactjs', 'CRA', 'Snowpack', 'Vite']
---

[Create React App (CRA)](https://create-react-app.dev/) is one of my favorite tools to bootstrap a new React project, providing me a sensible default for setting up and configuring build tools, such as webpack, Babel, etc., required for any "modern" web project. While it is important for me as a web developer to be familiar with the tools themselves, CRA is a worthy abstraction over these tools. Being able to get right into the business after running a single command `npx create-react-app <project-name>` is just so damn useful.

Even better, CRA supports "templates" to allow me to use a different basic setup. My current favorite is the official template for TypeScript `npx create-react-app <project-name> --template typescript`. And while I'm not there yet, I can see the value of creating a custom template to bootstrap a new project with some extra packages I regularly depend on.

But at what cost? As of this writing, a brand new CRA project with the default template takes close to two minutes to set up on my aged sub-\$500 HP laptop with WSL2 Ubuntu over home WiFi network. This claims over one quarter of a GB of storage space! Granted, a lot of this weight comes from the underlying development tools themselves. In addition, over the lifetime of a project, the first couple of minutes is close to nothing. Still this gets me wonder if there are any better, i.e. lighter, way to get started with a new React project.

While I'm sure there are a lot more ways to achieve this, I'd like to explore two options that recently caught my attention: [Create Snowpack App](<https://www.snowpack.dev/#create-snowpack-app-(csa)>) and [Vite](https://github.com/vitejs/vite).

## Create Snowpack App

Create Snowpack App (CSA) is a tool to bootstrap a new project powered by [Snowpack](https://www.snowpack.dev/), a "modern, lightweight toolchain for web application development." Just like CRA, creating a new CSA app is done by running `npx create-snowpack-app <project-name>`. While not tied to a specific library or framework, [CSA supports a set of official templates](https://www.snowpack.dev/#official-app-templates) for React, Preact, Vue, Svelte, and more.

I first heard of Snowpack, [which started as `@pika/web`](https://www.pika.dev/blog/pika-web-a-future-without-webpack/), from [this JS Party podcast episode](https://changelog.com/jsparty/69) over a year ago. While the idea of Pika and going all-in for ES Modules piqued my interest, I just didn't get a chance to play with it. Then, more recently, I learned that [Snowpack 2.0 just came out](https://www.snowpack.dev/posts/2020-05-26-snowpack-2-0-release/), promising <50ms start-up time, O(1) build system, etc. More interestingly, Snowpack 2.0 release also brought to the world CSA to quickly get started with a Snowpack-powered project.

## Vite

Vite is a web development and build tool created by [_that_ Evan You](https://vuejs.org/) to speed up--you guessed--Vue development. Naturally, running `npx create-vite-app <project-name>` sets up a new Vue project with Vite.[^1] However, Vite also supports React and Preact projects via [an official React plugin](https://github.com/vitejs/vite-plugin-react) and [templates](https://github.com/vitejs/create-vite-app#templates). Vite is currently in beta, but as of this writing [the official repo README says](https://github.com/vitejs/vite#status) it "will likely release 1.0 soon"... so 🤞.

[^1]: The command provided in the official README is `npm init vite-app`, but I later learned that `npm init <starter-kit>` is npm's way of doing `yarn create <starter-kit>`.

Although I've been primarily a React user for the last couple of months, it's no secret that I started my web development journey with Vue. So I have been following Evan on GitHub for a while. Thanks to this, I found about Vite as soon as the `vitejs/vite` repo was created in early April and ever since I've been checking the project's progress from time to time though without really giving it a try.

## Comparison

From a user's perspective, Snowpack and Vite provide many similar features and benefits, such as zero-bundling dev server, fast Hot Module Replacement, and built-in TypeScript support (compilation only without type checking). While Snowpack's CSA offers templates for a wider range of frameworks at the moment, for a React developer, Snowpack and Vite are mostly the same in practice.

So how do they compare? Since I often use TypeScript for my React projects, I'll also compare React + TypeScript setup for each tool.

### React only

- Command
  - **CRA**: `npx create-react-app <project-name>`
  - **CSA**: `npx create-snowpack-app <project-name> --template @snowpack/app-template-react`
  - **Vite**: `npx create-vite-app <project-name> --template react && cd <project-name> && npm install`
- Start up time (in seconds)
  - **CRA**: ~100
  - **CSA**: ~35
  - **Vite**: ~15
- Project size (in MBs)
  - **CRA**: 262
  - **CSA**: 141
  - **Vite**: 57
- \# of installed packages
  - **CRA**: 1641
  - **CSA**: 941
  - **Vite**: 330

### React + TypeScript

- Command
  - **CRA**: `npx create-react-app <project-name> --template typescript`
  - **CSA**: `npx create-snowpack-app <project-name> --template @snowpack/app-template-react-typescript`
  - **Vite**: `npx create-vite-app <project-name> --template react-ts && cd <project-name> && npm install`
- Start up time (in seconds)
  - **CRA**: ~110
  - **CSA**: ~35
  - **Vite**: ~15
- Project size (in MBs)
  - **CRA**: 311
  - **CSA**: 196
  - **Vite**: 109
- \# of installed packages
  - **CRA**: 1645
  - **CSA**: 946
  - **Vite**: 334

Out of these three, Vite results in the smallest project size with the least number of installed packages, which naturally translates to the fastest start up time. In case of the React only starter kit, the Vite project is **less than a quarter** the size of the CRA project for React only and about a third the size for React and TypeScript! While not to the same extent, CSA also shows a great improvement over CRA.

Upon a closer look, however, it turns out that the small size of Vite projects is partly due to how the official React and React + Typescript templates are set up, i.e. their lack of dependencies for linting, formatting, and testing. These might be superfluous for simple experiments, but many would consider them a necessity for any serious project.

When it comes to dev server, both Snowpack and Vite dev servers run instantaneously ⚡ just as promised! One minor difference between them is that the Snowpack dev server automatically opens a browser tab to display the running application while Vite dev server doesn't. When it comes to production build time, both CSA and Vite (using [Rollup](https://rollupjs.org/)) projects show comparable speed, which is not much faster than the CRA webpack build time for the simple starter app.

It must be noted that Snowpack "build" by default does not bundle the dependencies--instead, it more or less copies them over into `web-modules/` in the production build directory. Snowpack offers [an official webpack plugin](https://www.snowpack.dev/#bundle-for-production) to support bundled (and optimized) production builds.

## Thoughts

In my opinion, both CSA and Vite offer solid alternatives to CRA with practical benefits. On the surface level, CSA using its official React templates might be a better choice for typical projects that aim to ship to production. On the other hand, Vite with its official React templates might be a more practical option for quick experiments. In fact, linting and formatting can be easily handled by editor plugins. So really, the official Vite templates are only missing testing libraries.

However, as I pointed out earlier, the noted difference is due to how the provided templates are set up. Yes, [the default matters](https://en.wikipedia.org/wiki/Default_effect), but it is entirely possible to design a different template for custom use cases. When it comes to the essence of CSA and Vite experience, such as the blazing fast dev server, they are largely comparable to each other.

As it stands now, Vite has two minor drawbacks. The first drawback is that Vite is still in beta--though likely not for long. And the second drawback is that it uses Rollup rather than webpack, which is the de facto standard bundler, for production build.[^2] But for my personal use cases, this makes little difference.

[^2]: Yes, I consider this as a relative drawback solely for the reason that webpack, as the de facto standard bundler for many years now, has an undeniably larger ecosystem of plugins, resources, etc. But in 2020, it's only a "minor" drawback.

To wrap up, I'm happy to find out that there are at least two valid alternatives offering real improvements over CRA (e.g. smaller initial project size and faster dev server). I can already see myself using CSA or Vite to set up my next React project.
