---
title: "Getting into Haskell instead of..."
tags: ["learn", "Haskell", "functional programming"]
---

By a strange turn of fate, I'm getting into [Haskell](https://www.haskell.org/) and functional programming instead of other things I originally planned to study, including [Go](https://golang.org/).

Yes, I admit that my current interest in Haskell and functional programming, in general, is more theoretical than practical. Nevertheless, I believe in learning new things to shed light on what I already know--this has been exactly my own experience throughout my (short) journey in programming and more.[^1]

[^1]: For example, [trying out React helped me to better articulate what I like about Vue](../the-first-look-into-react-from-my-point-of-vue), learning Python deepened my understanding of R, and looking into Bayesian statistics clarified for me the limitations of conventional statistics.

## The appeal of going functional

In fact, the idea of functional programming has intrigued me for a while. This might have something to do with my data analysis background. After all, the practice of data carpentry[^2] is all about applying a series of transformations (i.e. functions) to data at hand. Here, quite a few ideas in functional programming are rather familiar ones.

[^2]: Aka data wrangling/cleaning/munging. While they are all pretty much synonyms, I prefer the term [data carpentry](https://blogs.lse.ac.uk/impactofsocialsciences/2014/09/01/data-carpentry-skilled-craft-data-science/), which rightly recognizes that the work is more than a mere chore, a necessary evil.

In the context of data analysis, data is considered immutable as it represents some past events. Changing data would be a work of fraud! Function composition is not a stranger, either. "Piping" multiple functions together is common in R and so is method chaining in [the `Pandas` package](https://pandas.pydata.org) for Python. Heck, even a SQL query is a composition of statements representing some transformation of the original data, which are, essentially, functions. Higher-order functions like `map` and `reduce` are data analysts' friends, too, and the function object is a first-class citizen in both R and Python.

Though the usual work of turning (most often tabular) data objects into useful summaries and shapes do not require the strict application of such ideas, they are there. Of course, functional programming is a lot more than these ideas often found in the work of analyzing data. Still, my experience in data analysis certainly got me interested in a more formal approach to functional programming.

## Giving Haskell a try

Okay, I'm interested. Where to start?

Though I don't recall when and where I first heard/read it, I remembered Haskell being a prime example of functional programming languages. So I did a little research (i.e. Googleing) on the current landscape of functional programming and concluded that, given my non-practical interest in the subject matter and other considerations (community, learning resources, emphasis on FP, etc.), learning Haskell would be a great choice.

Haskell seemed pretty scary at first, partly due to its unconventional syntax. For instance, it does not use parentheses for a function call. So, calling a function `f` on a parameter `a` would be simply `f a` instead of `f(a)`. Another interesting example is that a type signature for a function that takes two arguments of type `a` and `b` is often expressed as `f :: a -> b -> c` instead of, say, `f :: (a, b) -> c`. Here, the first type signature says that a function `f` takes a parameter of type `a`, returns another function that takes a parameter of type `b` and finally returns a value of type `c`. In practice, this is equivalent to taking a tuple of types `(a, b)` and return a value of type `c`. I guess it makes sense.

In addition, Haskell uses a lot of concepts and terminologies that are foreign to most mainstream languages: algebraic data type, functor, monad, and partial functions to name a few. And these terms mostly come from highly abstract mathematics of category theory. Soooo... a functor is a mapping between two categories and a category is a collection of objects and morphisms between them where a morphism is like a function but more general, and then, and then...

Despite such challenges (and more!), I believe that I will benefit in the long run from learning Haskell and its mathematical foundations as they surely push me to get out of my comfort zone and broaden my horizon. Again, I'm trying to follow the advice of the pragmatic programmer here.

## Down the rabbit hole--for fun and profit

One famous meme-quote about functional programming, especially Haskell, is:

> _"A monad is just a monoid in the category of endofunctors. What's the problem?"_

From what I've seen, this quote seems to be a parody of the functional programming community that is overly pedantic. It certainly appears that the community does not shy away from abstract and theoretical concepts and discussions. So much so that the basics of category theory, a foundational piece of functional programming, is almost treated as a prerequisite.

This is not to say that only select few of the mathematical elite can join the functional programming club. There are in fact plenty of resources to help anyone to get into functional programming.

Among them, I've found the following particularly useful:

- [Learn You Haskell for Great Good!](http://learnyouahaskell.com/chapters) by Miran Lipovača
  - This book, freely available online, for someone new to Haskell and functional programming in general. Though written in a light-hearted tone, the content seems pretty solid.
- [Category Theory for Programmers](https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/) by Bartosz Milewski
  - Another amazing resource for digging deeper into category theory and Haskell. This book, written as a series of blog posts, also comes with recorded lectures on YouTube ([Part I](https://www.youtube.com/playlist?list=PLbgaMIhjbmEnaH_LTkxLI7FMa2HsnawM_), [Part II](https://www.youtube.com/playlist?list=PLbgaMIhjbmElia1eCEZNvsVscFef9m0dm), and [Part II](https://www.youtube.com/playlist?list=PLbgaMIhjbmEn64WVX4B08B4h2rOtueWIL)). In addition to explaining the theoretical concepts, the author excels at providing a high-level understanding of why category theory matters.
- "Beginner's Track" chapters in [Haskell Wikibook](https://en.wikibooks.org/wiki/Haskell)
  - They read like a series of tutorials that is, in my opinion, comparable to [The Python Tutorial](https://docs.python.org/3/tutorial/) in the official Python documentation site. That is a compliment!

With the help of these resources, I am now going down the rabbit hole of Haskell and category theory--each new thing I learn leads to a set of more things to learn. What an exciting adventure!🤩