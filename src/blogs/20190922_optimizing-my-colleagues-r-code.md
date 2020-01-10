---
title: "Optimizing my colleague's R code"
---

A little more than a year ago, I started an R user group at work. It was originally intended as a continuation of a six-week R workshop I prepared and gave. Since then, the user group has been meeting once a month to share interesting projects, useful packages, informative talks, and more.

I might write a post on more about this user group and workshop later, but that's not the main topic for today's post. In this month's meeting, one of the user group members--let's call him John Doe--presented an ongoing project of his, focusing on handling large datasets. We are talking about a couple of GBs here--not so ginormous, but still burdensome to work with on a single workstation.

In his presentation, John shared his experience with `data.table` and parallel computing as well as how much performance gain he got from them. He also walked us through an R script showcasing how he implemented them.

## Problem statement

Now, to the point.

In the meeting, John also expressed that he would like to further optimize his code for stratified bootstrapping. The goal was that the code would run fast enough for him to experiment more with different approaches.

So, here is a snippet of his code with a minor simplification and renaming of variables:

```r
# load libraries ...
# prepare tables ...

# `tbl_count` and `tbl_strata` are data.tables

bootstrap <- function(tbl_count, group, location) {
  if(is.na(tbl_count[.(group, location), value])) return()

  sample_n(
    tbl_count[.(group, location)],
    1,
    replace = TRUE,
    weight = tbl_count[.(group, location), value]
  )
}

tbl_bootstrapped <- foreach(
  g = tbl_strata[, group],
  l = tbl_strata[, location],
  .combine = "rbind"
  .packages = c("data.table", "dplyr")
) %dopar% {
  bootstrap(tbl_count, g, l)
}
```

Very briefly, the code is intended to get a bootstrapped sample of `tbl_cout` data for all combinations of demographic groups and locations found in `tbl_strata`.

The user group made a few suggestions for potential optimization including the following two: 1) make `bootstrap` less costly and 2) find a performant alternative to `rbind` as an accumulator for `foreach`.

After the meeting, I dabbled with his code a bit more to implement these suggestions. And the results are as follows.

## Optimizing the `bootstrap` function

One of the most notable aspect of the original `bootstrap` function is the duplication of expression `tbl_count[.(group, location)]`.

This post is not about the `data.table` package and its syntax, so I won't get into the full explanation of this expression. Suffice it to say that it basically filters the table using the values of `group` and `location`.

Part of the optimization is then to get rid of the duplicated expressions. Accessing a specific cell in a keyed `data.table` is a very fast operation anyway, so I do not expect much performance gain from this change. However, the reulsting code would look a little cleaner.

While I'm at it, I also looked for a base R or `data.table` alternative to `dplyr::sample_n`, which turns its input data frame into a `tibble`--a minor but unnecessary operation in the given context.

Digging through the source code inside the `dplyr` GitHub repo revealed that `sample_n` is more or less a wrapper for the base R fuction `sample.int` with some safety checks. Since we have a clear understanding of the task at hand, there is no reason not to use `sample.int` directly.

### Code

Here is the full code for both the original and the optimized versions:

```r
# original
function(tbl_count, group, location) {
  if(is.na(tbl_count[.(group, location), value])) return()

  sample_n(
    tbl_count[.(group, location)],
    1,
    replace = TRUE,
    weight = tbl_count[.(group, location), value]
  )
}

# optimized
function(tbl_count, group, location) {
  x <- tbl_count[.(group, location)]
  p <- x[, value]
  
  if (!is.na(p)) list(x[sample.int(.N, 1, replace = TRUE, prob = p)])
}
```

The optimized function now returns the result wrapped in `list` to facilitate the optimization in the `foreach` expression. More on this in the following section.

## Optimizing `foreach` expression

Here, the key optimization target is to avoid using `rbind` in a loop, which is known to be rather slow. From what I've read, the poor performance of using `rbind` in a loop is largely due to having to repeatedly re-allocate memory for the growing data frame.

The major change for this part is to switch from `rbind` to `data.table::rbindlist`, which turns a list of `data.table`s into a single large `data.table`. This, in fact, is the reason why the refactored `bootstrap` function has to return a list. Since `rbindlist` expects a list of `data.table`s, the new approach first has to accumulate the `bootstrap` outputs into a single list. To do so, I'm simply using the base `c` function.

In some sense, this is not fundamentally different from the original apporach: instead of a single growing `data.frame`, we have a growing list of `data.table`s. If I know how many times I'll be calling `bootstrap` in advance, I can pre-allocate the memory by starting with an empty list of whatever the appropriate length. The `foreach` part will then be rewritten to assign `bootstrap` outputs into that list.

I was not sure if the list size can be determined beforehand for the given problem. Even if I could be certain on that point, not being familiar with using `foreach`, I did not know how to use the empty list apporach without losing `%dopar%` parallelization or resorting to a complete alternative to `foreach`.

### Code

Here is the full code for both the original and the optimized versions:

```r
# original
foreach(
  g = tbl_strata[, group],
  l = tbl_strata[, location],
  .combine = "rbind",
  .packages = c("data.table", "dplyr")
) %dopar% {
  bootstrap(tbl_count, g, l)
}

# optimized
rbindlist(
  foreach(
    g = tbl_strata[, group],
    l = tbl_strata[, location],
    .combine = "c",
    .final = rbindlist,
    .packages = c("data.table")
  ) %dopar% {
    bootstrap(tbl_count, g, l)
  }
)
```

## Testing my solution

Since the real data in John's project contains somewhat sensitive information, I could not directly profile and test my refactored code against the original.

However, I am free to cook up some fake data simulation!

```r
# global ----
SIZE = 1e3

# generate fake data ----
fake_count <- data.table(
  group = sample.int(100, SIZE, replace = TRUE),
  location = sample.int(500, SIZE, replace = TRUE),
  value = sample.int(1000, SIZE, replace = TRUE)
)

fake_strata <- data.table(
  group = sample.int(100, SIZE, replace = TRUE),
  location = sample.int(500, SIZE, replace = TRUE)
)
```

These fake datasets are notably smaller than the original--only 1K rows per table. Using `object.size`, I see that `fake_count` is about 13 Kb and `fake_strata` is about 9 Kb. They are also a lot simpler--all three variables are simple integers whereas the original data had some slightly more complicated string values. Regardless, it would be mostly unnecessary to use the full data for benchmarking anyway for comparison's sake.

So, here it goes:

```r
# setup ----
library(data.table)
library(doParallel)
library(dplyr)
library(foreach)
library(microbenchmark)

registerDoParallel(cores = detectCores())
set.seed(1234)

# global ----
SIZE = 1e3

# generate fake data ----
fake_count <- data.table(
  group = sample.int(100, SIZE, replace = TRUE),
  location = sample.int(500, SIZE, replace = TRUE),
  value = sample.int(1000, SIZE, replace = TRUE)
)

fake_strata <- data.table(
  group = sample.int(100, SIZE, replace = TRUE),
  location = sample.int(500, SIZE, replace = TRUE)
)

setkey(fake_count, group, location)
setkey(fake_strata, group, location)

# define bootstrap functions ----
bootstrap_original <- function(tbl_count, group, location) {
  if(is.na(tbl_count[.(group, location), value])) return()

  sample_n(
    tbl_count[.(group, location)],
    1,
    replace = TRUE,
    weight = tbl_count[.(group, location), value]
  )
}

bootstrap_optimized <- function(tbl_count, group, location) {
  x <- tbl_count[.(group, location)]
  p <- x[, value]
  
  if (!is.na(p)) list(x[sample.int(.N, 1, replace = TRUE, prob = p)])
}

# run benchmark ----
microbenchmark(
  original = foreach(
    group = fake_strata[, group],
    location = fake_strata[, location],
    .combine = 'rbind',
    .packages = c('dplyr', 'data.table')
  ) %dopar% {
    bootstrap_original(fake_count, group, location)
  },
  optimized = foreach(
    group = fake_strata[, group],
    location = fake_strata[, location],
    .combine = 'c',
    .final = rbindlist,
    .packages = 'data.table'
  ) %dopar% {
    bootstrap_optimized(fake_count, group, location)
  },
  times = 10L
)
```

I've also tried inputs of varying sizes to see if they scale differently. So, the results are as follows:

| Rows | Size (count) | Size (strata) | Min. | Median | Mean | Max. |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1K | ~13 Kb | ~9 Kb | 0.60 | 0.60 | 0.60 | 0.61 |
| 2K | ~25 Kb | ~17 Kb | 0.60 | 0.60 | 0.57 | 0.51 |
| 4K | ~49 Kb | ~33 Kb | 0.59 | 0.58 | 0.56 | 0.47 |
| 8K | ~96 Mb | ~64 Kb | 0.56 | 0.55 | 0.55 | 0.57 |

The benchmark columns in the table are on a relative scale where, for instance, 0.60 indicates that the optimized code took about 60% the time the original code did.

I could not try any larger inputs on my modestly equipped machine (Intel i5-6200U dual-core CPU and 8GB RAM) on a reasonable time frame. Benchmarking for 8K rows was already taking several minutes, which is much longer than what I'd normally allow for quick experimentation.

Nonetheless, if I am to extrapolate what I see in that table, it seems that the optimized code performs slightly better at scale, potentially leading to a even greater performance gain for the original problem with gigabytes of data.

## Epilogue

A few days after I shared my suggestion, I heard back from John that he saw a decent performance gain from these changes in addition to some more optimization efforts of his own including switching to [the Microsoft R distribution](https://mran.microsoft.com/open). Amazing!
