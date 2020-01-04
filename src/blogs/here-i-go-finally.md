---
title: "Here I Go, finally"
date: "2020-01-04"
---

At the end of 2019, I finally managed to get started with Go.

I know, [I am already dealing with three languages](../a-tale-of-three-languages). Not surprisingly, I have not truly mastered any of them. So, why get into another language?

First off, I believe in having more tools in my toolbox and am actually striving to follow Andrew Hunt and David Thomas' advice in _The Pragmatic Programmer_ to "learn at least one new language every year." Roughly speaking, I got started with R in 2016, became a bit little more serious with Python in 2017, and jumped on the JavaScript train in 2018.[^1] I really wanted to keep it going in 2019, which is why [I tried Haskell](../getting-into-haskell-instead-of) in Summer though with little success.[^2]

[^1]: The real timeline is a bit messier, of course. I also dabbled with C and Stan in 2018 for a few months, and didn't count SQL. I've been casually looking into TypeScript as well, but I wouldn't call it a separate programming language. Finally, I don't know what to say about shell scripting... I know a little bit of it and I sort of use it if I have to.

[^2]: Haskell being a rather niche language made it difficult for me to further invest in it especially at work. Nonetheless, I have greatly benefited from giving Haskell a try! It was through Haskell I found the basic concepts and principles of functional programming, which I strive to apply whenever possible. And, yeah, I will definitely give it another try... Maybe in 2020?

## Why Go?

Picking a new language to learn is often a personal choice. It can be motivated by pure curiosity, out of necessity (required for a new project at work), driven by some sort of hype ("_n_ best languages to learn in 20xx"), or based on other random aspects (a recommendation from a friend/colleague, an awesome official language icon, and so on). In my case, it's a little bit of everything.
  
Go surged in popularity in recent years partly thanks to, it seems, [the wild success of Docker]([https://www.zdnet.com/article/what-is-docker-and-why-is-it-so-darn-popular/](https://www.zdnet.com/article/what-is-docker-and-why-is-it-so-darn-popular/)) and its "cloud native computing" ecosystem, where many popular tools are also written in Go (Kubernetes, Prometheus, etc.). This, in fact, is how initially I got interested in Go: What is the technology behind Docker? In addition, I've been feeling the need to learn and use at least one proper statically typed language. (IMHO, TypeScript ain't it.) And there is no denying that Go is a practical choice for web development. Lastly, I'm intrigued by Go's minimalist ethos.

These are somewhat superficial reasons, I admit. But why not?

## Getting into Go

[As I wrote earlier](../jump-in-this-is-the-best-time-to-learn-programming), we are living in an excellent time to get into programming, and one reason why is the unprecendentedly high availability of resources for learning.

Go, of course, is not an exception here. [The official Go website](http://golang.org) offers a great series of documentation as well as an interactive playground. There are many YouTube videos, both conference talks and tutorials, explaining how Go works, too. It also helps that Go the language, thanks to its minimalism, comes with a relatively small set of core features with the familiar C-like syntax. Needless to say, I am benefitting from all these.

In fact, to tell the truth, I had been browsing online Go contents for a quite some time already before I typed out some real Go code. I had skimemed through the documentation pages, watched many conference talks and read tens of blog posts as well as, ah yes, Reddit threads. When I finally got my hands dirty and started writing some Go code, it was December 2019. And, of course, only then did I begin to understand what I had read and watched.

The most deciding factor for me, in this case, was a new project at work to build a web API server. Since I was fortunate enough to be able to choose my own stack for this project, I decided to give Go a try while keeping Node.js as a fallback.

So far, I like it!

## First impressions

Learning a new language is always learning a new way of looking at the world. This is true for programming languages as well as human languages. Go, in particular, is one of those languages with a clear vision (e.g. [see here](https://go-proverbs.github.io/)) and a strong commitment to that vision.[^3] And both the Go community and the Go ecosystem are markedly shaped by that vision.

[^3]: Among the languages I already use, Python probably comes to the closest to Go in this regard. The difference is that Python is no longer guided by its creator as the BDFL while Go is still quite exclusively under the control of a small set of authors. 

For those who are coming from more feature-ful languages, bashing on Go's limited set of features is almost like a meme. In fact, there is even [a GitHub repo dedicated to curating a list of "go is bad" articles](https://github.com/ksimka/go-is-not-good) though its stated rationale is not to attack Go. _Mea culpa_: I too had some fun skimming through discussions on Reddit, Quora, and other platforms where, say, Haskellers _dunk on_ Go because this and that.

Once I started taking Go more seriously, however, I began to see that its restricted set of features is for a pretty good reason. The simplicity (bordering primitivenss) of Go, when combined with its offical, opinionated tooling (`go fmt` in particular), ensures readability across all levels of experience. If a Go program is difficult to understand, it is rarely due to some complex syntax or advanced feature.

Go community appears well aware of the (intentional) limitations of the language. But instead of "fixing" them with more features or third-party packages, the community takes it as an opportunity to develop a disciplined approach to software design and architecture. This might very well be due to my limited experience, but I do not recall finding _as much_ discussion on software design and architecture in the JavaScript, R, or even Python community.

In fact, a lot of articles and conference talks on Go seem to focus on software development in an industrial or enterprise setting. The goal here is not to explore what the language can offer or express new ideas but to build something that lasts and meets the business needs. In that sense, learning Go amounts to learning how to write quality, reliable software.

## Growing with Go

For now, I'm sold. Currently, I am learning Go while at the same time exploring how I can leverage its strengths to build a robust software product for this year's project at work. I feel very optimistic that working with Go will help me to grow as a software engineer in 2020. If anything, I will certainly learn to become more self-reliant when writing specific features instead of constantly shopping for yet another package to add to dependencies.

So, yes, here I Go, finally!