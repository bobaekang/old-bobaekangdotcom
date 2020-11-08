---
title: 'Saving my GitHub contribution graph'
tags: ['GitHub', 'project', 'trick']
---

Last Friday was my last day at Illinois Criminal Justice Information Authority (ICJIA) as a Research Analyst. Fortunately, I'm not simply being let go but moving on to another great opportunity. I have been extremely lucky to find this new position--especially given the current health and economic situations. And, of course, there is always a lot to talk about switching jobs.

But today, I'm here to discuss one of the most important aspects of job switch: _saving my GitHub contribution graph_.

Over the last couple of years, I have made many contributions to a number of projects at ICJIA. Most of these projects are public repositories on ICJIA's GitHub organization. This allowed me to build a pretty good-looking contribution graph. It's a vanity thing, I admit, but looking at a long streak of contributions on my GitHub profile does feel good.

What I didn't know was that all my contributions to the ICJIA repos go away with leaving the organization. Shortly after I removed myself from the ICJIA organization page as a team member, I found my contribution graph completely decimated. _Panic!_ 😱

When I recovered from the initial moment of panic, I started searching online like a madman using search terms like "recovering GitHub contributions after leaving an organization" and its many variations. Apparently, and understandably, there were at least a few others who encountered the same panicky moment. Surely, there is nothing new under the sun.

Then I found [this public GitHub repository](https://github.com/isaacs/github) by Issac Schlueter of GitHub (previously of npm) created to publically track issues and feature requests to GitHub.[^1] And there, I found this Issue thread discussing precisely what I encountered: ["Keep Github commit graph when leaving an organization"](https://github.com/isaacs/github/issues/1138).

[^1]: Not an official channel but only as a public service and recordkeeping.

The collective intelligence of the Issue thread taught me the following two things:

1. The loss of contributions when leaving an organization is an ongoing problem (as of May 2010).
2. There are at least to ways to get around the problem and save contributions: 1) create personal repos and push local copies to them and 2) star the original repos.

The first solution, creating personal repos, can be problematic for numerous reasons. First of all, you might not have the local clones available on your personal computer. They might be old projects that you already deleted from your machine or maybe you were required to use the office computer to work on them. Alternatively, they might be private repos for the organization that shouldn't be exposed to the public eye. In fact, if the original repos were meant to be private, you might be risking serious consequences, legal and otherwise, by uploading the codebase to your personal repos, even if as private repos.

The second solution, while much simpler and less risky, has one key limitation: if the projects you contributed to are stored as private repos, you might already have lost access to them. In my case, thankfully, most--if not all--projects I worked on remain as public repos.

One thing that wasn't clear to me from the discussion was whether starring the repos _after_ I left the organization. And the only way to find out was to try it. So I started a dozen ICJIA repos and ... it worked! I got hundreds of my precious contributions back. 😭

Now that I have recovered my contribution graph, let me wrap up this post with a brief comment:

I think GitHub really should allow people to keep their contributions after leaving an organization. Or maybe even after the project they contributed to gets deleted by the project owner. Like it or not, many people, including employers, often consider the contribution graph as an indicator--though a crude one, yes--of developer productivity.[^2] And it is somewhat unfortunate that people lose their work due to events that are completely out of their control.

[^2]: Still true after [the death of code streaks a few years ago](https://github.blog/2016-05-19-more-contributions-on-your-profile/).

Inevitably, there will be bad faith actors who abuse the changed system to inflate their perceived productivity. But it is already possible--and easy--to artificially boost one's contribution count using, e.g., a bot, a meaningless private repo, or both. So why not allow many good faith actors to find some genuine satisfaction and motivation from the visual representation of their honest work?

## TL;DR

You can star the original repos to get your contributions back on your graph!
