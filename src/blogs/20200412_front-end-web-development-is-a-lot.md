---
title: 'Front-end web development is a lot!'
tags: ['programming', 'web']
---

I recently had a chance to talk to a friend curious about getting started with front-end web development. This motivated me to compile a list of learning resources into a kind of curriculum to get started with front-end web development. The goal was to make something like [_Front-end Developer Handbook_](https://frontendmasters.com/books/front-end-handbook/2019/) but with more guidance and relying solely on freely available resources.

Unfortunately, the friend ultimately decided not to follow through and keep exploring front-end web development as a career option (and for good reasons, I'm sure), and I lost an incentive to complete the curriculum. Hopefully I can find some time to finish it anyway in near future.

Regardless, this experience allowed me to take a step back and review the landscape of the modern front-end web development. And, not surprisingly, I was reminded that front-end web development is a lot.

On the surface, it seems that the fundamental technologies of front-end web development remain the same--they are, of course, HTML, CSS, and JavaScript. While this might be true, it would be misguided to think that the work of front-end web development has remained unchanged as well. Not only all these fundamental technologies have evolved to a great extent and continues to evolve, but also relying only on them fall short--by a lot!--if the goal is to build anything but a simple toy project, not to mention to get a job as a front-end web developer.

One reason why this is the case is because the front-end web technologies as a whole have gotten much, much more powerful. So powerful that it has become fully viable to build a fairly complex application _without_ a server to dynamically render pages and execute tasks on request.[^1] And, as everyone knows, with great power comes great responsibility.

[^1]: To get a sense of how "powerful" front end is today, watch [this talk](https://www.youtube.com/watch?v=grSxHfGoaeg) by Chris Coyier from JAMstack Conf 2018, promptly titled "The All Powerful Front End Developer."

Today, almost everything _can_ be handled on the client side or using serverless functions,[^2] from templating to styling to routing to state management to authentication to form validation to core business logic to... The list goes on. This power greatly and understandably shifted the burden of managing complexities to front-end web development. Yes, there are excellent set of tools to help, but these tools come with their own complexity. In the end, a front-end developer is left with a lot more to learn to get the job done.

[^2]: Of course, whether all these works _have_ to be handled on the client side or using serverless functions is a totally different question.

Plus, the concerns of modern front-end web development reach far beyond building client-side applications per se, partly due to the growing size and complexity of the very applications to build. I've already mentioned serverless functions, which of course come with complexities of writing, deploying, and maintaining them. More generally, front-end web developers are now expected to be at least knowledgeable about version control system, CI/CD tools, static site hosting services, cloud/serverless computing services, software development architectures, and more.

Moreover, the modern front-end web development is increasingly a team effort. While this is not limited to the front end, any front-end web developer must be at least open to work in a team and learning development practices to support a team project.

This is not to say that one needs to master everything mentioned above from the get-go. I'd argue that a good grasp of JavaScript the language, decent understanding of HTML and CSS, and working knowledge of a popular JavaScript framework and its ecosystem would suffice to get started. But the complexity is there, and it will be near impossible not to confront it as one progresses in his or her career.

So yes, the modern front-end web development is a lot!
