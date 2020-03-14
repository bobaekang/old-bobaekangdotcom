---
title: 'Choosing between Go and Typescript'
tags: ['Go', 'TypeScript']
---

In the last couple of months, I have been exploring various options for my project at work. And the time has come for me to make key decisions so that I can finally start working on the application based on those decisions.

One such decision is choosing a programming language, between Go and TypeScript in this case. I have been learning and writing some toy apps using both, keeping in mind the comparison between them. I have grown to appreciate and enjoy writing code in both Go and TypeScript, but the job has to be done and the choice has to be made.

So, in the following, I will briefly go through a list of key considerations I had and compare the choices based on these considerations. I will then reveal and explain what my final choice is.

## Productivity

I think I can be fairly productive in writing a simple Node.js application with TypeScript. It was not that difficult to get started with TypeScript at all, especially for a new project. Incorporating TypeScript into an existing project might take a little more effort although I have not tried it yet. As in any other Node.js project, it is a bit of hassle to get the development setup right, but once everything is there, the workflow feels right. In particular, I appreciate how well the language is supported by Visual Studio Code, my main editor. Well done, Microsoft.

So far, I have been using a minimal TypeScript setup similar to what I have introduced [in this post](../minimal-typescript-project-setup-for-curious-minds), which does not use `webpack`. This setup uses `ts-node` as a development server, [which does not support watching changes and automatic code reloads](https://github.com/TypeStrong/ts-node#watching-and-restarting). In other words, any changes to source code require re-starting the development server manually.[^1] Regardless, incorporating type checking and testing give me enough confidence that the application will behave largely as expected in runtime. This may not be the case for creating a front-end UI application.

[^1]: Of course, I can always switch to using `webpack` and get the hot-reload going with `ts-loader` so this is nothing but a minor nuisance.

Getting started with Go was pretty straightforward as well. In fact, the required setup to get productive with Go is even simpler. No need to download dozens of npm packages even for the simplest project. No need to manually set up commands for the common tasks including build, test, and lint. In general, the standard Go setup feels more robust with less moving parts. I have grown to appreciate the value of strong standardization over a competing set of conventions and best practices. And Go offers that.

Unfortunately, based on my experience, VS Code's Go support still leaves much to be desired. Maybe this is just me, a newbie, not knowing how to get it right, but I definitely re-installed the VS Code Go extension and read through [Issues on its GitHub repo](https://github.com/microsoft/vscode-go/issues) more than a few times. Certainly not a positive sign in terms of productivity if I have to fight the editor to use the language.

## Maintainability

Every JavaScript developer has heard of JavaScript fatigue. Yes, the Node.js ecosystem moves very fast, and it is often challenging to keep up with the change. In addition, it is typical to any Node.js application to depend on dozens, if not hundreds, of third-party packages. And frequently updating dependencies is important, if not for keeping up with new features, for security reasons. This means that the final application, even after going in production, requires regular maintenance efforts.

The Go ecosystem takes a very different approach. As mentioned earlier, Go offers great tooling that takes care of the common development needs. No separate linting, formatting or testing library as in the JavaScript ecosystem. In addition, the Go community feels strongly about using the Go standard library as much as possible. From my limited experience, many package authors seem to share this sentiment and tend to limit their dependencies to the minimum, which leads to a relatively small dependency tree. Consequently, once complied and deployed, the Go application would require little maintenance except for the cases of critical security patches or meaningful feature updates.

## Type system

All the languages I am most familiar with are dynamically typed: JavaScript, R, and Python. In fact, the first time I was exposed to the static type system was when I dabbled with Haskell last summer. Meanwhile, the more mainstream resources on static typing are written from the OOP perspective in which I have had no formal training. The very idea of the type system as a whole is still very new to me.

That said, I find that TypeScript offers a more flexible and expressive type system when compared to Go. One of the key elements of this flexibility is TypeScript's support for the sum type or discriminated union type. I won't pretend to know in-depth what sum type is; in this context, suffices it to say that sum types make it easier for me to define a more flexible type or write "generic" functions for common operations on multiple data types. Using Go interfaces helps, but still requires a lot more boilerplate code.

One interesting thing I found missing in TypeScript is that TypeScript has no built-in `int` type because, well, JavaScript doesn't. For what I do, this has not been a critical issue.

## Final choice

At the end of the day, I have decided to go with ... TypeScript!

It turned out to be a simple decision, actually: the Microsoft SQL Server version we use at work is not supported by [the SQL Server Driver for Go](https://github.com/denisenkom/go-mssqldb). I even found an Issue that the maintainer has no plan to support the old version. Well, upgrading the SQL Server is certainly beyond my power, and in that case, I have no intention to further complicate the project architecture just to use Go.

Even before this finding, however, I was already leaning toward TypeScript. The only webmaster at work, who will eventually be responsible for operating and maintaining the application, is first and foremost a JavaScript developer who is familiar with `Express` and other packages the application in TypeScript will depend on. Although without a doubt, he would pick up Go in no time if needed, I have no right to impose that extra responsibility onto him.

Plus, when I spoke with him earlier about the choice between TypeScript and Go, I learned that he would be managing the application process with `PM2` either way. While `PM2` is perfectly capable of managing non-Node.js applications [including a binary](https://pm2.keymetrics.io/docs/usage/process-management/#binary-code-execution), this does mean that Node.js will be on the production server anyway.

So that's it. Building an application is more than just the application itself--it must take into consideration the existing infrastructure as well as people who will be impacted. In the case of my ongoing project, Go turned out to be not a good fit. So, yeah, I'm excited to be working more with TypeScript in weeks to come!
