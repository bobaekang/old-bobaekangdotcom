---
title: "Netlify FTW!"
date: "2019-10-30"
---

Today on my way home, I listened to [a recent episode of JS Party](https://changelog.com/jsparty/99), a podcast that is "a weekly celebration of JavaScript and the web." This was basically a Netlify episode, where the host interviewed Phil Hawksworth, the "principle DX engineer at Netlify" and a co-author of Modern Web Development on the JAMstack (available for [free download]((https://www.netlify.com/oreilly-jamstack/))).

Listening to the podcast, I got inspired to write this post on what I love about [Netlify](https://www.netlify.com/), a service that I cannot live without and that allowed me to successfully "fake it until make it" as a web developer.

## What is Netlify?

> _"Netlify is an all-in-one platform for automating modern web projects."_ \- Netlify official documentation

In other words, [Netlify](https://www.netlify.com/) is ❤️. And I mean it!

Netlify helps me to experiment with designing and building web applications with such a low cost, thus encouraging me to "get my hands dirty" without fearing something going wrong. We all know that "getting hands dirty" is the best way to learn new technologies and build new software. And the low cost of experimentation means that I can try implementing new features and fix errors at a faster pace based on concrete feedback.

When I first heard of Netlify, I thought it would be a slightly better alternative to GitHub Pages. Boy, was I wrong!

This post is not a place for detailed explanation of what Netlify offers. For that, I would like to refer you to its amazing [documentation](https://docs.netlify.com/). Instead, I will briefly discuss a few Netlify features that really made my life easier.

## Generous free-tier option

Yes, this is important. Netlify has a free-tier, "starter" account that offers so much that I feel almost sorry to stay there.

Netlify's case, in fact, is more of an example of a larger trend than an exception. Today, there are many services offer a free-of-charge option that is well suited for most small-scale projects but may not be sufficient for a medium- to large-scale project by a team.

Still, Netlify offers plenty of useful features for free with a generous amount of resources. I'd say Netlify's free-tier service is comparable to that of GitHub, and that's by no means a low bar. I hope to be a paying customer of Netlify soon, but I really don't *have to* for 100% of my use cases.

## Branch deploy

There are many amazing features Netlify offers even for a free-tier account, but if I really have to choose one, it has to be [branch deploy](https://docs.netlify.com/site-deploys/overview/#branches-and-deploys).

Netlify nicely intergrates with any git repository. And that integration goes deep--a lot deeper than simply triggering an application to build at `git push`. Using Netlify, I can quickly deploy a non-production branch of the site, which makes it easy to check and test new features and bug fixes in the same environment the eventual production version will live on.

When I deploy a specific branch, Netlify also kindly generates a subdomain prefixed by the select branch of the default ".netlify.com" domain. For example,if my site's default URL is "myawesomesite.netlify.com", its "develop" branch can be deployed to "develop--myawesomesite.netlify.com".

Currently, I have enabled branch deploy for most of my Netlify sites. This is particularly useful when I need to share the "development version" of the site with others who are not "tech-savvy" enough to clone the project GitHub repository, built the site, and run it locally. Even if one can do it, that's a lot of work anyway. Instead, I can now simply pass along the URL for the branch deploy hosted on Netlify that is accessible anywhere, anytime. 


## Prerendering for SEO

Single Page Applications (SPAs) are where it's at. Among the most popular "JavaScript frameworks" for building web applications are React.js and Vue.js. And the default way of building apps with them is SPA. They are fast, responsive, and interactive. SPAs truly push the boundaries of what a web "application" is capable of.

As amazing as SPAs are, they still fall short in some areas--particularly when it comes to Search Engine Optimization (SEO). In fact, this shortcoming is relevant to not only actual search engines like Google and others but also most social media platforms. This is because many existing crawlers for search engines and social media sites do not wait for all that JavaScript magic to generate the content--they just take the shell in the index.html and run away with it.

Prerendering is one of the popular solutions to this problem. With prerendering, crawlers get served a fully generated page instead of the shell while normal users can still enjoy the full dynamic experience of a SPA. And with Netlify, [prerendering basically comes for free](https://docs.netlify.com/site-deploys/post-processing/prerendering/)! Knowing that Netlify will take care of SEO, I can focus on building and improving user experience. Peace of mind. 🏝

## And more gems

### Simple and powerful rewrites

Netlify made it super easy to [specify HTTP 200 rewrites to other sites](https://docs.netlify.com/routing/redirects/rewrites-proxies/), making it easy to build and manage a project that consists of multiple sites under the hood. It only takes a simple text file, named `_redirects` and placed at the root of the deployed site.

One "drawback" is that 200 rewrites are only allowed among sites owned by the same team. There are, of course, potential workarounds. But really, at that point, one should pay for the service. 😅

### Deploy management and easy rollback

So what if something went wrong with that latest build? What if a feature I pushed became undesirable later and needed to be taken down? With Netlify, switching to a previous deploy is as easy as a few clicks on its dashboard. Plus, that switch is *instant* as Netlify has a copy of the previous build and, therefore, does not have to go through the build process again. Of course, Netlify offers a lot more features for [managing deploys](https://docs.netlify.com/site-deploys/manage-deploys/).

### Flexible build hooks

Netlify offers amazingly flexible [build hooks](https://docs.netlify.com/configure-builds/build-hooks/). First, the same site can have multiple build hooks. What's amazing about this is that I can "name" each hook to encode, for example, what and why the build is triggered. In addition, the hook can be specified to trigger the build of a specific git branch! This flexibility empowers me to test some interesting architecture that involves triggering the build of the site without bothering the production site. And the deploy log will provide more information about that test.

## I'm just getting started here!

My limited experience using Netlify as a free-tier user only scratches the surface of what Netlify offers. And even with a "starter" account, there are so many more I have not tried. For instance, I have not yet tried to programmatically configure Netlify settings [using `netlify.toml` file](https://docs.netlify.com/configure-builds/file-based-configuration). Or I barely dipped my toe into [Netlify Dev CLI](https://www.netlify.com/products/dev/). Also, I never really deployed any [serverless functions](https://docs.netlify.com/functions/overview/) using Netlify.

Nonetheless, I can say with confidence that Netlify is one of the best web project platforms out there that really empowers even a self-taught newbie developer like myself to create something good.

Netlify FTW!