---
title: "A tale of three languages"
tags: ["learn", "R", "Python", "JavaScript"]
---


Though I'm still not much more than a self-taught amateur, I've so far picked up about three programming languages, been using them in various contexts, and now feel confident in considering myself past the absolute beginner stage for each of them. (Haskell, of course, is not one of these. 😅)

It has been an interesting journey, to say the least, and I feel passionate and excited to keep going. In the meantime, I'd like to take a step back for a moment and document what I've been through so far. Perhaps I can learn a thing or two from the very steps I took...

So the following is my tale of three languages.

## It all started with R

And it's been four years already! To keep it 💯, my initial motivation for learning R was to pick up a marketable and transferrable skill. The term "data science" was at all rage in the summer of 2016 and I was about to begin my one-year MA program in social sciences.

As a sociology & anthropology major, I felt my undergraduate training focused heavily on qualitative research had not sufficiently equipped me to do well in the job market. Having read about "the sexiest job in the 21st century", I was determined to use my Masters year to switch gears. Fortunately, the MA program was light in requirements and flexible as to what classes I could take. So I filled up my schedule with classes on computational and statistical methods for social science.

In those classes, I was exposed to R and Python. At that moment, R felt a lot more intuitive for working with tabular, structured data, which was the data format I found most relevant to my own interests and experiences. R really made it easy to work with tabular datasets, draw good-looking plots, and run simple statistical tests or fit regression models on them.

One thing I appreciate most is the overall ecosystem of working with R as _non_-programmer. The RStudio IDE's convenient UI and the intuitive syntax of [the `tidyverse` packages](https://www.tidyverse.org/) really helped me to ease into working with code. Plus, with R Markdown, coding and programming were fused into the familiar work of writing. And [Shiny]() introduced me to the pleasure of building a simple web app without having to fully understand what was going on.

I definitely had my share of sleepless nights working with R to complete my school assignments before the deadlines, but all in all, I had much fun felt empowered to do some amazing stuff I never dreamed of before. The fact that the R community largely consisted of _amateur_ programmers also made me feel at home.

Looking back, this feeling of empowerment was what motivated me to venture further into the world of programming and software engineering.

## Then came Python

I was also exposed to Python during my graduate year but without any formal introduction to the language. Because of that, I was rather intimidated by the language at first. It came to me as more of a challenge than fun.

My knowledge in R was both a blessing and a curse. I could quickly pick up the basic control flow and such, but much of Python looked still foreign to me--from its assignment operator (using `=` instead of `<-`) to indentation-based syntax (no curly braces?) to object-oriented features (defining classes and using method calls). 

Once I started investing my time and energy in learning Python, however, I began to realize that Python is much better suited for more generic, non-data-analysis-specific tasks. _And_ the "PyData stack" packages offer a mature and comprehensive solution for most data analysis needs.

Personally, I was particularly pleased to see that organizing code in modules and packages was baked into the very design of the language. (Accomplishing the same in R still requires a lot more effort.) Python's elegant comprehension syntax is something else I began to miss when working with R. 

Its ecosystem also seemed a lot more, well, organized. [`numpy`](https://www.numpy.org/) is _the_ numerical computing package, [`pandas`](https://pandas.pydata.org/) is _the_ tabular data analysis package, [`scikit-learn`](https://scikit-learn.org/) as _the_ machine learning package, and so on. The quality of documentation of these packages impressed me, too. And, of course, there is [PEP 8](https://www.python.org/dev/peps/pep-0008/) as _the_ style guide. Despite the growing prominence and popularity of `tidyverse` packages, R ecosystem is still lagging behind Python in this respect.

To be clear, this is not to say that "multiple solutions to the same problem" is inherently bad. I believe that competing solutions can often lead to innovations and better quality. From a package user's perspective, however, being able to rely on the quality, standard package for my problem is certainly a lot more convenient.

Thanks to Python, I might have finally peeked into the rigor of software engineering.

## JavaScript, and back to dizzying dynamism

It was actually [Vue.js]([https://vuejs.org](https://vuejs.org/)) that led me to JavaScript, not the other way around. Upon hearing that I was looking for a way into the Web development, a friend of mine introduced me to Vue. Vue was easy to start, carefully documented, and rising in popularity--an ideal combination for any beginner. I tried building simple apps, and it worked like magic.

But without understanding the underlying technology i.e. JavaScript, the whole framework remained just that--magic. I Googled to find solutions for my problems, but solutions didn't make sense to me. Copying and pasting those solutions quickly became highly unsatisfactory and clearly untenable. It was time for me to get started with JavaScript.

A new vibrant world opened up to me, one that might be even crazier than that of R. The language was evolving fast and new frameworks seemed to emerge every week. The JavaScript community was _huge_ and the scale and scope of its ecosystem were overwhelming. At the same time, it was very exciting to re-discover such vibrancy--both in JavaScript and its home ground, the Web.[^1]

[^1]: I might be little biased and unfair here because I never truly ventured into the Web when I was writing Python previously. Still, I'd argue that what's hot in the Pythonland today is not so much the Web but the AI/DL.

This dynamism, of course, is a double-edged sword. The now popular term "JavaScript fatigue" points to precisely that. While it can be exciting to witness and participate in the fast evolution of the language and its ecosystem, having to constantly keep up with never-ending changes is exhausting, to say the least. Ultimately, though, I believe that it is a healthy sign that the community is openly discussing it and working to find a better way forward.

By the way, as I began looking into functional programming, JavaScript turns out to be the best of the three at least as a learning instrument. For instance, while all three languages support higher-order functions, the compact syntax of ES6 arrow function is best suited for implementing curried functions. This is not to say that JavaScript is superior in all aspects regarding functional style. For instance, immutability is a tough nut to crack in JavaScript while R offers it as a default behavior. But then again, functional programming is much more actively discussed in the JavaScript community, which means more tools, tutorials, and other learning materials.

## And, today...

I rely on all three of them. JavaScript (mostly through Vue) for the main web development project at work at the moment, R for quick data cleaning or analysis, and Python for automating some minor tasks.

Is using multiple tools making me, as the saying goes, a "jack of all trades, master of none?" Maybe. At least for now, however, they all help me to get things done and I appreciate that. 🙏