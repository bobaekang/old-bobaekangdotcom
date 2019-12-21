---
title: "My first major project has shipped!"
date: "2019-12-21"
---

My first professional web application project, dubbed ICJIA Research Hub, has been deployed to production a little while ago and now [officially announced](https://twitter.com/ICJIA_Illinois/status/1204507465708126208)! This marks a personal as well as professional milestone for me and a great way to close the year of 2019.

So, in this post, I'd like to recount how this project came about with some thoughts and reflections.

## A brief introduction

The ICJIA Research Hub project was developed to provide a web publishing platform for the Research & Analysis (R&A) Unit of [Illinois Criminal Justice Information Authority](https://icjia.illinois.gov/) (ICJIA).

Broadly speaking, the ICJIA Research Hub project had two motivations.

Internally, the project sought to offer a solution to the communication bottleneck between the IT staff and R&A staff when publishing and maintaining its research contents. The project solved this problem by creating a suite of web applications for internal use that gives content authors a full control over the publication workflow.

Externally, the R&A Unit wanted to have a focused web presence that has a modern look & feel and is easy for users to navigate and consume its contents. The project achieved (partly) this by building a public-facing client-side app ([_Research Hub_](https://icjia.illinois.gov/researchhub)) that is fast, feature-rich, responsive, and based on material design.

The final production service consists of five components, a public-facing [Vue](https://vuejs.org/) app (*Research Hub*), a [Strapi](http://strapi.io/) app that provides API to the database, two Vue apps for internal use (*Research Hub Studio* and *Preview*), and a [VuePress](https://vuepress.vuejs.org/) site for documentation. If you're interested in more details, see [this page](https://icjia.illinois.gov/researchhub/docs/dev-guide/architecture.html) in the documentation site.

## An origin story

This project was originally started as the ICJIA Data Portal project and aimed to build a "data portal" website for the R&A Unit. The Unit had a number of datasets posted on the main ICJIA website for the public viewers to download and use. But there were some challenges.

First, the datasets were difficult to find because they were buried under many other contents on the website designed and built to serve the whole agency. Second, they were presented using a table, which was not ideal for providing contextual information in a user-friendly way. Third, the data format was not suitable for modern data analysis software and presented.

The Data Portal project was going to solve these issues.

As the project moved forward, however, it became apparent that the basic concept of building a dedicated, user-friendly website serving the Unit's research products without relying on IT could be applicable to other types of research publications, i.e. articles and interactive apps.

Since the articles constituted the R&A Unit's primary type of research publication, I first spoke with my colleagues who had authored articles and went through the publication process. The idea of publishing a content without having to coordinate with IT clearly resonated with them, so I spoke with my manager and proposed to expand the scope of this project.

After some meetings and discussions, my manager agreed to make the pivot. And the project was renamed from ICJIA Data Portal to ICJIA Research Hub.

## Aligned interests break organizational inertia

I have to say that my manager is an absolute superhero to allow me to change the shape and scope of the project in the middle of it.[^1]

[^1]: Come to think of it, this flexibility might have been possible only because ICJIA was not under some competitive pressure for commercial success. This is not to say that the agency does not care about the quality of project deliverables. But the lower risk of experimentation certainly allows for new bold possibilities.

That said, I think it was crucial that this new direction offered a clear and immediate benefit to all of the R&A Unit staff publishing their research articles. The scope of the project meant the whole new publication process for the entire Unit and challenging an established practice could be an uphill battle in any organization.

As I've mentioned above, most R&A authors quickly understood the value proposition of the ICJIA Research Hub process. Gaining full control over the publication process for their own articles would mean less delay, less frustration and more productivity. Somewhat surprisingly, the IT staff soon became supportive as well. They realized that the new publication process would free them from having to work with frustrated researchers demanding changes to their web articles that might be inconvenient from the technological standpoint.

Last but not least, the R&A Unit Manager and the agency's Executive Director found it valuable to add a modern-looking website for presenting the agency's research publications. With their blessing, the ICJIA Research Hub project fully overcame the organizational inertia in favor of the established practices.

## Attending to the users' needs

One of the key ideas about the ICJIA Research Hub was creating a "studio" application to provide a user-friendly interface to managing contents. The R&A authors would be using the "studio" app to create and publish their contents. This means that, to succeed, the app's UI and features had to make sense from the existing procedure's standpoint while making meaningful improvements to it.

In order to properly model the existing process, I spoke with many authors among the R&A staff. Speaking with them really helped me to reevaluate my assumptions about the process.

For instance, the original publication process involved the IT creating a "temporary" page for the rendered article as a preview. This was necessary for not only the author who could not _see_ the final result of their work beforehand but also managers who needed to review and approve the web article before it was officially published.

This led me to add a "preview" app to the Research Hub application suite. The preview app would be separate from the studio app, which required authentication, and allow anyone to view the contents prior to the official publication. With this change, the underlying data model also changed to include a new "submit" status--in addition to "created" and "published"--for all Research Hub contents.

Based on the feedback from the authors, I was able to add more changes to the project, some large and some small. The end result is the R&A authors publishing their contents to [the _Research Hub_ website](https://icjia.illinois.gov/researchhub) mostly unbeknownst to me. When it comes to tech, of course, no news is good news. 😄

## A path forward

This was my first time building something major that has real users other than myself.[^2] I'm sure the code can be much improved and the apps are missing some useful features as they are. But it still feels surreal that the whole suite of ICJIA Research Hub applications are up and running, with contents created by several colleagues of mine and consumed by many others from the Illinois public.

[^2]: Well, I did make [a small Shiny app](https://app.icjia.cloud/app/ucr-index-offense-explorer) for work a while ago and continue to maintain it. But that was nowhere close to the scale and scope of the ICJIA Research Hub project.

While I'm moving on to a next year's project at work, I recognize that the project did have few opportunities to get feedback from the public, who is the ultimate client of [_Research Hub_](https://icjia.illinois.gov/researchhub) and its contents. For that, ICJIA now has a dedicated email channel to receive error reports and other feedback: [CJA.ResearchHub@illinois.gov](mailto:CJA.ResearchHub@illinois.gov).

So, if you happened to stumble upon this blog post, I humbly ask you to check out [_Research Hub_](https://icjia.illinois.gov/researchhub) and let me know what you think. Feel free to share your thoughts and recommendations via email or open an Issue post on [GitHub](https://github.com/icjia/researchhub)!
