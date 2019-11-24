---
title: "My journey to finding R modules"
date: "2019-11-24"
---

R is still my go-to language when it comes to data wrangling and analysis tasks. But I have long been frustrated that R does not offer a simple, built-in solution to use modules for organizing code into multiple files, each encapsulates functions/objects to serve a specific purpose. Python has it, JavaScript has it, and many other major languages have it. Why not R?

Yes, there is R package, but creating a package often takes significantly more effort than I'm willing to put even with all the support from `devtools` and dedicated R Studio features. I don't want all that boilerplate just to organize some utility functions in separate files and use them without polluting my work environment--especially if they are meant specifically for the project at hand, not some general use cases.

Not finding any satisfying existing solution, I did what many others do in similar situations. [I created one](https://github.com/bobaekang/r-module)--not another package to install but a simple trick (maybe a hack) that relies solely on base R features.

In this post, I'm not going to explain in detail how my solution works. Instead, I'd like to keep a record of my journey to my current solution here.

## Chapter one: What works works

My first few attempts at getting modules work involved immediately-invoked function expression, or IIFE, which evaluates what's inside the function body and outputs the function return value only--all without polluting the global environment. IIFE in R looks like this:

```r
(function() {

  # your code here

})()
```

Since R function returns the very last object for the evaluated function body, I had to come up with a way to pass multiple functions and objects as a single return value. I first used R environment as a container for functions and objects to export and later switched to using list, which seemed more beginner-friendly to me.

At this point, using a module looked something like this:

```r
# module.R
(function() {
  f <- function() print("Huzzah!")
  list(
    f = f
  )
})()

# main.R
m <- source("module.R")$value

m$f()
#> [1] "Huzzah!"
```

The R module trick (or hack) was for my own use as much as (potentially) for others', and mixing IIFE and list served my needs just fine for a while. Module scripts were not looking pretty with clunky IIFE syntax, but I was still able to break long R scripts into smaller pieces and use them without worrying about name collisions.

It worked. And that was enough at first.

## Chapter two: For better look and feel

A few months later, however, the aesthetics started to bother me. `source("module.R")$value` just didn't look right, and I found myself defining a short utility function like the following:

```r
import_module <- function(path) source(path)$value
m <- import_module("module.R")

m$f()
#> [1] "Huzzah!"
```

At this point, I realized that I could just put this small function on my "R module trick" repo on GitHub. And while I'm at it, why not add some goodies to make it a bit ~~fancier~~ easier?

So I added `attach` and `name` parameters to my `import_module()`. Setting `attach = TRUE` (default) would put the module in the search path, making its contents accessible from the global environment. Alternatively, Setting `attach = FALSE` would assign the module to an object in the global environment. And `name` value, if provided, would be used instead of the default name, i.e. the module script filename. In addition, I included some error checking in `import_module()` to give warning messages for invalid parameter inputs as well as an informative message when the module was successfully loaded.

```r
source("https://raw.githubusercontent.com/bobaekang/r-module-trick/master/import_module.R")
import_module("module.R", name = "m")
#> Note: 'module:m' now attached to the search path

f()
#> [1] "Huzzah!"

# alternatively ...
import_module("module.R", name = "m", attach = FALSE)
#> Note: 'm' now available in the global environment

m$f()
#> [1] "Huzzah!"
```

Hmm, that remote path to the "import_module.R" script seemed too long to my eye. So I created [TinyURL](https://tinyurl.com/) for it: "https://tinyurl.com/r-module.trick/\*" now would direct to "https://raw.githubusercontent.com/bobaekang/r-module-trick/master/\*".

Finally, just to help others, like my future self, to get a quick reminder of how the function works, I added another function, `import_module_help()` to display documentation for `import_module()`.

I realized that I created an entire user experience centered around using my trick. It both looked and felt good.

## Chapter three: Less (trick) is more

Only a few days later, I found out about `local()`, which allows evaluating R expressions in a local environment. While experimenting with using `local()`, I also learned that `source()` has `local` argument, which could keep the evaluated results of `source()` in a local environment. Wait, I realized, I might not need that ugly IIFE hack after all!

Turns out, the combination of these new findings allowed me to keep the module script simple:

```r
# module.R
f <- function() print("Huzzah!")

# export
list(
  f = f
)
```

Now *that* looks like a simple module script! The only requirement here is for the last line to export the `list` containing module elements.

There was still a trade-off. Now the ugliness was pushed to `main.R` that imports the module:

```r
# main.R
m <- local(source("module.R", local = TRUE)$value)

m$f()
#> [1] "Huzzah!"
```

I still liked that the new approach was using one less trick. No IIFE, just normal function calls with what the base R offers. Plus, one can always make the ugly `local(source(path, local = TRUE)$value)` into a function:

```r
# using DIY import_module
import_module <- function(path) local(source(path, local = TRUE)$value)
m <- import_module("module.R")

m$f()
#> [1] "Huzzah!"
```

And, of course, everyone is welcome to use my version of `import_module()` with [a few extra features including `name`, `attach` and more](https://github.com/bobaekang/r-module#import_module-function), which is now living inside a new GitHub repo also with a friendly TinyURL path.

```r
source("https://tinyurl.com/r-module/import_module.R")
import_module("module.R", name = "m")
#> Note: 'module:m' now attached to the search path

f()
#> [1] "Huzzah!"
```

\* * * 

So, there it is. My little journey to finding R modules.

Are you an R user? I cordially invite you to give [R modules](https://github.com/bobaekang/r-module) a try, leave a ⭐ if you liked, and open [a Github Issue](https://github.com/bobaekang/r-module/issues) if you find a 🐞.