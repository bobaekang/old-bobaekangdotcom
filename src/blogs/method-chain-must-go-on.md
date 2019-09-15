---
title: "The method chain must go on"
date: "2019-09-08"
---

Recently, I had a chance to refactor a Python command-line app used internally at work. The key function of this app is to fetch and reshape some tabular data to update a database and generate a CSV file that is a dataset product based on the records in the database.

This time, in addition to fixing some minor bugs, I attempted to make the code a bit more "functional." I am not going to go all the way to turn everything into complex function compositions or implement some kind of monads to strictly isolate side effects and so forth. Instead, I'm trying here to adopt key ideas of the functional style.

This means, in principle, making my data immutable when possible and avoiding directly manipulating values. The app works with tabular data for the most part, so it is naturally and heavily dependent on [the great pandas library](https://pandas.pydata.org). Therefore, in practice, I'm really talking about taking full advantage of `pandas` method chaining.

In this post, I'm going to highlight a few `pandas.DataFrame` methods I found particularly helpful and interesting while refactoring my app. For illustrations' purposes, I will be using the following dummy data frames:

```python
arrests = pd.DataFrame({
    'year': [2019, 2019, 2019, 2018, 2018, 2018],
    'county': [1, 2, 3, 1, 2, 3],
    'violent': [5, 15, 10, 8, 12, 10],
    'property': [50, 150, 30, 45, 125, 55]
})

population = pd.DataFrame({
    'YEAR': [2019, 2019, 2019, 2018, 2018, 2018]
    'COUNTY': [1, 2, 3, 1, 2, 3]
    'POPULATION': [50000, 200000, 75000, 45000, 210000, 70000]
})
```

Here, `arrests` is a data frame with arrest counts for violent and property crime and `population` is a data frame with population counts. They both contain observations for two years for three different counties.

## Subsetting with `.query`, `.filter`, and `.drop`

One of the most common operations in reshaping a tabular data object is subsetting, either by rows or columns. And when it comes to subsetting a data frame, [`pandas.DataFrame.loc`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.loc.html) is like a Swiss army knife. This single method can handle subsetting both rows and columns either by labels or conditions.

This versatility, however, is a double-edged sword. When one method does so much, the semantics of each method call gets muddled a bit. In addition, `.loc` is accessing the subset of a data frame, which means any operations applied to that subset might lead to mutating the original data frame.[^1]

[^1]: I'm picking on `.loc` specifically because `.ix` is now deprecated and `.iloc` is limited to integer-based indexing.

So, I looked for more focused methods that can help me to both clarify my intention and retain immutability when subsetting a data frame. And I found [`pandas.DataFrame.query`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.query.html), [`pandas.DataFrame.filter`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.filter.html), and [`pandas.DataFrame.drop`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.drop.html).

`.query` is dedicated to subsetting a data frame rows with a condition. Frankly, I think the name "filter" fits this role better, but maybe that's just because of my background in using R with `dplyr`. "where" would have been a good choice, too, following `WHERE` statement in SQL. `.query` provides a boolean `inplace` parameter to avoid making a copy of the data frame, if desired.

`.filter` allows us to subset a data frame using indices. Technically, `.filter` method makes it possible to subset rows as well as columns if rows are indexed, which can be achieved by setting `axis` parameter value to 0. In general, I do not rely on row indices much, so for me, this is similar to `dplyr::select` or just SQL `SELECT` statement.

Lastly, although `.filter` is capable of everything `.drop` can do, using `.drop` to exclude specific columns may be more concise as well as more clearly expressing the intent. 

### Example

Let's say that we are trying to get only 2019 records for violent arrests in county number 1. The code would look like the following:

```python
# Using `.loc`
arrest.loc[arrest.year == 2019 & arrest.county == 1, ['violent']]

# Using `.query` and `.filter`
arrest \
    .query('year == 2019 and county == 1') \
    .filter(items = ['violent'])
```

While the `.loc` approach is terse and gets the job done, putting everything into a single method call makes can become quickly confusing.

The second approach with `.query` and `.filter` breaks what `.loc` was doing into two sequential steps. In my view, this improves readability and clarifies the intention of each method call.

One added benefit of using `.query` is that the data frame columns are already in its namespace, allowing me to write `year == 2019` instead of `arrest.year == 2019`. This may lead to code that is more succinct and to the point.[^2]

[^2]: [I have also read](https://jakevdp.github.io/PythonDataScienceHandbook/03.12-performance-eval-and-query.html) that `.query` can be beneficial in terms of performance as it does not need to allocate memory for intermediate steps as `NumPy` expressions would normally do. Regardless, my rationale for favoring `.query` over `.loc` here is based on readability first, not performance.

## Changing column names with `.rename` and `.set_axis`

When using `pandas.DataFrame`, perhaps the most straightforward approach to renaming columns of a data frame is directly assigning new values to the column labels. For instance:

```python
df = pd.DataFrame({
    'var_1': ['foo', 'bar', 'baz'],
    'var_2': [1, 2, 3],
    'var_3': [True, False, True]
})

# assign new column labels
df.columns = ['var_str', 'var_int', 'var_bool']
```

This, however, not only necessarily breaks the method chain but also mutates the original data frame. I found many instances of code like this in my app, and trying to turn such code into a method chain led me to [`pandas.DataFrame.rename`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.rename.html) and [`pandas.DataFrame.set_axis`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.set_axis.html).

`.rename` takes a `columns` parameter, which could be either a function or a dictionary where each key-value pair corresponds to the mapping between old labels and new labels for columns. `.rename` makes it easy to apply a common transformation intended for all columns (e.g. make all column labels lowercase) or to change only a subset of column labels--which could be rather verbose when directly assigning a new list of labels to the data frame.

`.set_axis` is useful when a list of new labels is already available. Instead of having to create a new dictionary for `.rename`, I can simply supply this list as an input to `labels` parameter. Of course, as its name suggests, `.set_axis` is not limited to setting column labels. Also as suggested by the name, this method _sets_ the axis labels in-place as the default behavior. However, immutability can be achieved by setting `inplace` parameter value to `False`. 

### Example

Say that I'd like to rename the columns of `population` to lowercase as in `arrest`. The code would look like the following:

```python
# Reassigning columns (mutating population)
population.columns = [x.lower() for x in population.columns]

# Using `.rename`
population.rename(columns=str.lower)
```

List comprehension is often a concise replacement for using loop, but in this case, `.rename` offers an even terser alternative while keeping the original data frame intact and being more expressive.

## Creating/mutating columns with `.assign`

Another common operation in reshaping a tabular data object is to create a new column or modifying an existing column. When working in R with `dplyr`, we would use [`dplyr::mutate`](https://dplyr.tidyverse.org/reference/mutate.html)to achieve this.

In `pandas`, this is often achieved by, again, mutating a data frame object using vectorized operations with column indexing:

```python
df = pd.DataFrame({'x': [1, 2, 3]})
# >>> df
#       x
# 0     1
# 1     2
# 2     3

df['y'] = df['x'] * 2

# >>> df
#       x     y
# 0     1     2
# 1     2     4
# 2     3     6
```

Though convenient, this approach is again violating immutability and fails to support method chaining. This is where [`pandas.DataFrame.assign`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.assign.html) comes in.

`.assign` takes either a callable (i.e. function) or a value. When it's a callable, it can be a function of existing columns. Since the Python syntax for anonymous function requires `lambda` keyword, using `.assign` may appear verbose at first. But it allows for creating and/or modifying multiple columns with a single method call, thus compressing multiple expressions into one.

### Example

Adding a new column to `arrest` for the total arrest counts may look like the following.

```python
# Column indexing (mutating arrest)
arrest['total'] = arrest['violent'] + arrest['property']

# Using `.assign`
arrest.assign(total=lambda x: x.violent + x.property)
```

Again, `.assign` comes with the benefit of immutability while keeping the method chaining unbroken.

## Putting all together

So, let's see how the methods discussed thus far could be used together for a moderately sophisticated data analysis task.

Let's say that, using `arrest` and `population` data frames, we want to get a table of arrest counts for violent crime in counties "1" and "2" in 2019. We also want to calculate rates per 1,000 to account for the population size. The final output will have four columns: `year`, `county`, `violent` and `violent_per_1k`.

Here are two possible solutions for the given task:

### Imperative code
```python
arrest = arrest.loc[
    arrest.year == 2019 & arrest.county < 3,
    ['year', 'county', 'violent']
]

population.columns = [x.lower() for x in population.columns]

merged = pd.merge(arrest, population)

merged['violent_per_1k'] = merged['violent'] / merged['population'] * 1000

final = merged[['year', 'county', 'violent', 'violent_per_1k']]
```

### Method chaining
```python
final = arrest \
    .query('year == 2019 and county < 3') \
    .filter(items=['year', 'county', 'violent']) \
    .merge(population.rename(columns=str.lower)) \
    .assign(violent_per_1k=lambda x: x.violent / x.population * 1000) \
    .drop(columns=['population'])
```

I don't know about you, dear reader, but the second approach to the given task seems to me a lot cleaner as well as easier to read and understand what has been done to reach the final output.[^3] In addition, the method chaining approach keeps `arrest` and `population` unchanged, allowing us to continue on and conduct more exploratory data analysis.

[^3]: I am sure there are better ways to implement the first approach, but I think mine is not so far off the target. 😅

## Bonus: Applying functions with `.pipe`

[pandas.DataFrame.pipe](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.pipe.html) is a godsend since it allows us to apply non-method `pandas` functions without breaking the method chain. The only constraint for ensuring the method chain to go on is that the provided function must take a data frame as an input and return a data frame as its output.

There are many `pandas` functions that can be introduced into our method chain via `.pipe`. One great candidate for using `.pipe` is `pandas.concat` for concatenating a list of data frame objects. In this case, calling `pandas.DataFrame.append` repeatedly can achieve the same, but `pandas.concat` is [known to be more efficient](https://jakevdp.github.io/PythonDataScienceHandbook/03.06-concat-and-append.html#The-append()-method).

```python
# Using .append
df1.append(df2).append(df3)

# Using pd.concat with .pipe
def append_dfs(df, dfs):
    return pd.concat([df, *dfs])

df1.pipe(append_dfs, [df2, df3])
```

More generally, any arbitrary operation, or a set of operations, on `pandas.DataFrame` can be made into a function with a meaningful name. This allows my method chain to be more expressive and focused on business logic. Even turning a number of methods into a single function and using it with `.pipe` can help to achieve better abstraction.

## Caveats

A usual trade-off when adopting a functional style for most commonly used programming languages is one between performance and abstraction.

In the case of `pandas` method chaining, the creation of an intermediate copy at each method call may lead to higher memory use and computation time. So if performance is the top priority, we should not shy away from directly manipulating a data frame at hand.

Then again, we should not sacrifice improved readability and maintainability for a trivial gain in performance. So, whenever feasible, we may as well keep that method chain going!