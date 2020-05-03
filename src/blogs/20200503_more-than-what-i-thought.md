---
title: 'More than what I thought'
tags: ['project']
---

For the last week or so, I have been working on handing over to my colleagues a project--I wrote about this project in [a past blog post](../my-first-major-project-has-shipped). This process has been a great learning experience so far, so I decided to jot down some thoughts (and lessons learned, maybe) before I eventually forget them in a few weeks.

A quick background: The project, dubbed ICJIA Research Hub, was funded by a year-long grant that ended with its completion in last December, which meant that my involvement with it was also over then. However, I've been maintaining the project since its launch while being hesitant to hand it over to others. There are two reasons for this.

First, the project was a big landmark for me both personally and professionally. This was the first non-trivial web project I ever built and deployed for a real (non-personal) use case. It was very much my brainchild from the very beginning to the end--I wrote the grant proposal (with my then supervisor's generous support), chose the tech stack all on my own (with guidance from ICJIA's only webmaster), wrote every single line of code for the applications that make up the project, and oversaw its official launch. I have to admit that I feel attached to the project.

Second, I didn't want to burden the webmaster, whom I thought would be the only likely person to take over the project, by adding yet another project to his already full plate. It was much easier for me anyway to make minor changes to the project than having to communicate every nook and cranny of each application to him. So I'd much rather do it myself and add to my GitHub contribution counts. 😉

But the time has finally come. Any professional work should survive a transfer of ownership and responsibility. I'm testing if I did a decent job with mine as I try to share all the details with my colleagues.

What quickly became clear was that I had completely wrong expectations about what I would need to share.

## Don't assume anything

First, I expected to hand over my applications to the webmaster, who is already well versed in the tools and technologies used in the project. Instead, another programmer at ICJIA, who typically works with a different set of technologies, was chosen for the job. Since the webmaster is currently managing a dozen web projects for the organization, it makes sense that another person to step in and assist at least temporarily.

Unfortunately, this seemingly reasonable decision dramatically increased the scope of knowledge to transfer.

I was reminded (again) that building (as well as maintaining) modern web applications is a rather complex task that involves a lot of concepts, tools, and more. Some of the complexity is more or less overlooked while I'm fully immersed into the project. I _just_ know it. But a need to clearly enumerate all the key aspects of the project brings that complexity to the foreground.

Could I have done a better job at containing the complexity while meeting all the project requirements? Absolutely. But what if I cannot take for granted that the future maintainer would _just_ know to first run `npm install` after cloning the repository? And, sure, the new maintainer is familiar with using Git, but what about the next person? So I have to include the basics of Git and GitHub. What about the conventions I rely on for commit messages? For branching strategy? For versioning?

So, lesson one: I cannot assume anything when it comes to future project maintainers. Someone may decide to change things in future, but for now, I have to document _everything_.

## Don't force separation between technical and domain knowledge

Second, I expected that the future maintainers' responsibility will be limited to the formal and technical aspects of the applications. As I was drafting the notes to future maintainers, however, it quickly became clear that the applications cannot be separated from the contents they support. While the maintainers do not need to be experts in the contents and the process to generate and manage those contents, they cannot be totally ignorant.

For example, future project maintainers need to know that this application is meant for the end users to consume the contents while that application is meant for the internal staff to author and manage those contents. In addition, the maintainers need to know that there are different types of contents with different sets of fields, some common to all content types and others unique to each content type.

The maintainers need to know the lifecycle of each content item, from being first created to be submitted for internal review to be published for public consumption to be taken down from the public view. They also need to know what types of users are involved in this process and which user has what permissions--and the implications of user types in authentication and differential access to certain application features.

So, lesson two: I cannot assume a clear separation between technical and non-technical aspect of the project. One cannot truly understand any application feature without knowing use cases it supports.

## Don't procrastinate on those documentations

Thankfully, I did one thing right before getting into this process to hand over the project to my colleagues. That is, I did create documentation sites for key parts of the project. These documentation sites are by no means perfect and fully comprehensive, but they certainly served as references when writing my notes to future maintainers.

The value of well-written documentation is already widely discussed and appreciated. In fact, I'd guess that I'm late to realize the importance of documentation in a project since I have been working as a team of one person for the most part. I am sure my appreciation for documentation will only grow when I start working in a team setting.

Anyhow, for now, I'm glad that my past self did not disregard documentations as part of this project.

## Missed opportunities

_Monorepo_: The ICJIA Research Hub includes three front end Vue.js applications that share a number of components. Currently these components are stored in a GitHub repository that is then used in other applications by (ab)using `npm`'s support for installing a package directly from GitHub repo. This leads to repeating the steps to pull the latest changes to these shared components for all three front end applications. Using a monorepo would make remove this repetition.

_Testing and static typing_: Proper testing and static typing, both currently missing, would help to guard the project against unintended consequences of future changes. While these would add to the amount of total knowledge to transfer, they will most likely pay the dividends in the long run.

I shall remember these missed opportunities so that I won't have the same regrets with my future projects.
