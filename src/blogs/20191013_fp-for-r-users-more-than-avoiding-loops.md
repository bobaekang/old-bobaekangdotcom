---
title: "FP for R users--more than avoiding loops"
---

Earlier this week, I was searching for some materials for this month's R user group meeting at work. In the process, I came to [a recorded webinar on functional programming](https://www.youtube.com/watch?v=bzUmK0Y07ck) led by none other than Hadley Wickham himself. The webinar focused mostly on using basic `purrr` functions, including `map` and its variants such as `map_dfr`, `map2`, etc.

Few members of the user group had any prior experience with functional programming, so I was excited to introduce FP to them at first. Eventually, this month's meeting took a different direction and I did not get a chance to talk about FP (yet). But the webinar really got me thinking. In his presentation, Wickham was framing FP almost entirely in terms of avoiding loops.

This actually reminded me of my first encounter to [the `purrr` package](https://purrr.tidyverse.org/) a while ago. It was a tutorial I found in the wonderful [R-Bloggers](https://www.r-bloggers.com/) website on using `purrr` functions to handle multiple data frames at once. While I was not able to find that origial post again, this is to my best knowledge how FP is often introduced in the R userland.

I feel a bit ambivalent to Wickham's strategy here.

On one hand, for typical data analysis tasks working with tabular data, handling multiple data objects simultaneously is an imporatant and highly practical technique. Therefore, using `purrr::map` to operate on a list of `data.frame`s and `purrr::walk` to write multiple CSV files on disk offer great motivating examples for many R users. On the other hand, to my eye, mapping a function over a list, or any other kind of functor, is more of an application than a foundation of FP. I am by no means a FP ninja, but to me the point of FP is composing (pure) functions.

As a "student" of Wickham (in a sense that I first learned R through his books--[R for Data Science](https://r4ds.had.co.nz/) and [Advanced R](https://adv-r.hadley.nz/)), I understand how Wickham pedegogically prioritizes practical skills over theoretical understanding. In case of this particular webinar, however, he did not seem to adequately contextualize the techniques he introduced, potentially providing a skewed picture of what FP is about.

Granted, in my view, discussing "piping" functions using `%>%` might be a better place for getting started with FP for most R users. That is, letting data flow through a comutational pipeline of functions to get the result seems to me closer to the spirit of FP than avoiding writing loops with some magic function. This can also easily lead to `purrr::compose` as a conceptual extension of building `%>%` pipelines. And `purrr::map` and its friends can be (initially) framed as a means to keep that pipeline going when facing a list of objects or objects living in some other special contexts (logging, error checking, IO, etc.).

Then the notion of pure function and immutability may enter. Luckily, R users are generally familiar with these notions since function application in R is immutable by default. That is, as long as the user does not assign the result of computation back to the same symbol, the input remains the same and accessible by the same symbol.

A key advantage of this alternative approach, in my view, is that FP appears something already familiar to R users. Rethinking pipes does not bring any immediate practical benefits--but when the user comes to `map`, its very concept is better situated in the broader context of function composition.

All that said, I don't know if I would be the best person to present FP to my friends in the user group. After all, they are all busy doing their work and maybe Wickham is 100% right to talk first and foremost in practical terms.