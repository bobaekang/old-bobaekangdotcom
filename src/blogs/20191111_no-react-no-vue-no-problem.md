---
title: "No React, no Vue, no problem"
tags: ["project", "trick", "webpack", "Tailwindcss"]
---

Recently, I worked on a minimal website for my spouse to help her with building a professional online presence. When I first came to this task, the first tool I was going to reach for was, of course, Vue.js. Vue is great, and I'm already familiar with it--so why not? Or I can use this as an opportunity to practice React![^1]

[^1]: To be brutally honest, I haven't really touched React since I built this website/blog with Gatsby.😅

Then I remembered the saying, "if all you have is a hammer, everything looks like a nail." Or some version of it.

Using the right tool for the given job is important, of course. But it seems to me that this is even more critical in software engineering today. I mean, it is so tempting to pick the most advanced or fashionable programming language/framework/library/programming style/design pattern regardless of what the task is.

It is also equally tempting to just pick what I'm already used to. It is a blessing and a curse that most existing tools in software engineering are so flexible that they can often do what they're not explicitly designed for.[^2]

[^2]: [Functional programming in Java](https://www.google.com/search?q=functional+programming+in+java)--how about that!

## A quick note on the state of Web

In the world of Web, in particular, many have been writing and participating in discussions on bloated webpages. [In 2011, the average website size less than 800KB was a concern](https://royal.pingdom.com/web-pages-getting-bloated-here-is-why/). In 2019, it appears that we would be lucky to have a page less than a couple of megabytes. And the growing size of website may lead to more than suboptimal performance. It can be [a matter of unequal access to information](https://www.smashingmagazine.com/2019/07/web-on-50mb-budget/)!

Plus, the increasingly popular front-end JavaScript libraries and frameworks, despite all the benefits they offer, [don't seem to help in this context](https://blog.uncommon.is/the-baseline-costs-of-javascript-frameworks-f768e2865d4a). Websites that are single-page applications (SPAs) built with React and Vue are beautifully interactive, but often "[you don't probably need a single-page application](https://journal.plausible.io/you-probably-dont-need-a-single-page-app)".

## Project requirements

With all that in mind, I looked around for an alternative solution for my project, i.e. a static, one-page website to convey some information with a simple contact form. More specifically, I looked for solutions that meet the following requirements:

- Responsive design
- Component-based
- Minimal bundle size

Let me elaborate on each.

### Responsive design

The volume of mobile web traffic has been at least comparable to that of desktop/laptop traffic [since the beginning of 2017](https://www.statista.com/statistics/277125/share-of-website-traffic-coming-from-mobile-devices/). In this day and age, adopting responsive design for a website, if not "mobile-first" design, is no longer an option and failing to do so can be costly. For one, [Google Search prioritizes "mobile-friendly" contents for indexing and ranking](https://developers.google.com/search/mobile-sites/mobile-first-indexing).

### Component-based

Even though the project is to create a simple website, I am fully convinced of the component-based approach to web development, not only for reusability but also for better organization of code. Even though I was not going to use JavaScript component libraries like React and Vue, I wanted to retain the concept of component in this project.

### Minimal bundle size

Obviously, for the kind of project I have here, there is no excuse for not keeping it minimal in size. Though I did not have an explicit budget for keeping the size in check, it would make no sense for my project to be a multi-MB monster.

## My solution

After some research, I discovered [Tailwind CSS](https://tailwindcss.com/), a "utility-first CSS framework for rapidly building custom designs." I was immediately sold to its idea of [composable CSS classes](https://tailwindcss.com/docs/extracting-components#extracting-css-components-with-apply), which not only offered a more flexible solution than the likes of [Boostrap](https://getbootstrap.com/) but also nicely fits the idea of components.

To further push the idea of using components, I relied on webpack's [`html-loader`](https://github.com/webpack-contrib/html-loader) and its convenient interpolation feature. This allowed me to split and organize the html into smaller pieces.

Mixing these two tools, I could create simple "components", each of which is a combination of a piece of HTML code ("partial") to define the structure and accompanying CSS classes to give it a nice responsive look.

Then, to meet the final requirement of a small bundle size, I resorted to [using Purgecss as recommended in Tailwind CSS documentation](https://tailwindcss.com/docs/controlling-file-size#removing-unused-css) so that the resulting CSS bundle would be kept to a minimum.

## The result

"A picture is worth a thousand words." Or, in my case, [a link to the final website is](https://wellness.oliviabioni.com) is. And, of course, here is a link to [the GitHub repo](https://github.com/bobaekang/olivia-bioni-wellness-website).

It really is a simple website with the total size of <1MB, most of which comes from images. The actual HTML takes up about 6KB (gzipped ~2.3KB), CSS about 15KB (gzipped ~4KB), and JavaScript about 2KB (gzipped ~1KB). [Bare necessities](https://www.youtube.com/watch?v=5dhSdnDb3tk), am I right?

Though I cannot say that this is the best it could be, I am still very proud of how the website turned out. This project also gave me a chance to practice working with webpack directly instead of relying on, say, Vue CLI to set up the basics. I feel very empowered by this. 💪

## Epilogue

Speaking of "a right tool for the job": I originally planned to use [Google Sheets](https://www.google.com/sheets/about/) as a database alternative for the contact form submissions. Simply leaving an email address seemed inadequate and not sufficiently professional while getting a separate database for this kind of a project would be an absolute overkill. Unfortunately, working with [Google Sheets API](https://developers.google.com/sheets/api) on the browser turned out to be rather complicated and I spent days trying to make it work.

Then I was reminded of [Google Forms](https://www.google.com/forms/about/). 😂