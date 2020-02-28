---
title: "DRY is not just for code"
tags: ["learn", "programming"]
---

I've been re-reading _The Programatic Programmer_, this time, [the 20th year edition](https://www.amazon.com/Pragmatic-Programmer-journey-mastery-Anniversary/dp/0135957052). Yeah, the new edition came out in 2018, but I didn't have a chance to pick it up until recently.

While I'm still working through the book, one thing that stood out to me this time reading was the section on the _DRY_ (Don't Repeast Yourself) principle (_Tip 11_). The first edition of _The Programatic Programmer_ also has a section on the _DRY_ principle, but I think the new edition did a even greater job explaining what DRY is really by presenting it in the context of the overarching Easy-To-Change (ETC) principle.

## DRY, not just for code

Of course, DRY is a well known principle. I, too, am generally on the lookout for copy-pasting lines of code or restating the same information in the form of comments. The first problem is often solved through adding another layer of abstraction (e.g. defining a new function) and the second, through thoughtful naming of variables, functions, etc.

However, DRY is clearly more than that. Here is a quote from the book:

> "DRY is about the duplication of knowledge, of intent. It’s about expressing the same thing in two different places, possibly in two totally different ways."

When understood in terms of _knowledge_, not code, DRY can be applied on the level of software architecture--or even across teams and projects!

## A case study

While going through the DRY chapter of the book, I was particularly struck by the notion of "representational duplication." The idea is that the knowledge might be duplicated between my application (code) and external resources it interfaces with--thus violating DRY. 

Exactly what I was doing in my project!

A little background. At work, I am currently building a simple web API to serve a set of tables from a database. Each table contains a set of grouping "variables" and values, i.e. aggregated count of arrests, arrestees or arrest charges. The following is one possible such table:

year | county | crimetype | value
--- | --- | --- | ---
2011 | 1 | 0 | 12321
2011 | 1 | 1 | 45654
2011 | 1 | 2 | 78987
2011 | 2 | 0 | 21232
2011 | 2 | 1 | 54565
2011 | 2 | 2 | 87898
2011 | 3 | 0 | 32123
... | ... | ... | ...

This table is obviously using fake data, but you get the idea.

Originally, I modeled the notion of table as an array of rows, where each row is in turn a pair of a collection of variables and an integer value. Here, each variable is a simple key-value pair, where the key, i.e. the variable name, is always of the string type and its value of either integer or string.

In TypeScript:

```typescript
type Variable = {
    name: string
    value: numeric | string
}

type Row = {
    variables: Variable[]
    value: numeric
}

type Table = Row[]
```

Here I am using the `numeric` type to represent integer values. This is because JavaScript, and by extension TypeScript, does not support the integer type out of the box.

Now, an important thing to note is that all these tables are coming straight from a database that already contains the schema for each table. In other words, by trying to model these tables in detail, I was in fact duplicating the knowledge in multiple places though unwittingly. The duplicated knowledge then introduces a coupling between my application and the database--if one changes, the other has to change, too, to accommodate. The code is less ETC as a result.

How, then, can I avoid this coupling? Here is a suggestion from the book:

> "Rather than writing code that represents external data in a fixed structure (an instance of a struct or class, for example), just stick it into a key/value data structure (your language might call it a map, hash, dictionary, or even object)."

To follow their suggestion, I simplified the table model by removing the distinction between variables and value in each row:

```typescript
type Row = { [string]: numeric | string }

type Table = Row[]
```

I could have resort to something even more flexible, like using the `any` type inside my `Row` type. But I was (and still am) fairly certain that the data coming from database would be restricted to string or integers. For example, SQL Server does not support the Boolean data type and the arrest counts cannot be a float.

## Reaping the benefits

Soon after this change was made, I was able to benefit from it! As the project moved forward, it became clear that, for a variety of reasons, it would be convenient to store the data using two different table types: tables containing the actual data (e.g. aggregated arrest counts) and "reference" tables. Here, a reference table should be prepare for each variable and would have two columns, one for the encoded values and the other for the actual value. For instance, a reference table for the `gender` variable will have a row that maps `0` to `FEMALE` and so on.

This would have not worked with the original model since the "value" column for a reference table should be of the `string` type rather than `numeric` as in other normal tables. Had I not followed the book's suggestion, I would have had to either 1) allow both `numeric` and `string` for the value field in the original `Row` type or 2) create a separate `RefTable` type to handle reference tables explicitly.

However, since the changed `Row` type was much more flexible, I didn't really have to change the application code to accommodate the reference tables!

## DRY pragmatically

With a moment of enlightenment like this, it is easy to go all the way and overdo it, trying to apply the newly learned lesson whenever and wherever possible. But moderation is often the key.

A little after benefiting from this new understanding of DRY, I got an opportunity to think again about the implication of DRY, i.e., reducing knowledge duplication in a project. I was having a conversation with a colleague of mine and that conversation reminded me of one potential limit of such efforts toward knowledege de-duplication.

The conversation was about the project of his to add several new columns to a certain table in the database in order to provide researchers with commonly requested information. These new columns were created by joining the table with other existing tables in the same database. So, in a sense, they were a form of duplicated knowledge. If we were to apply DRY blindly, we should not be creating such "convenience" columns.

But sometimes it does make sense to duplicate knowledge. In this case, these new columns would allow the users of the table, i.e. researchers, to do more with less efforts. That is, knowledge duplication in one place was allowing eliminating duplicated efforts in another: researchers looking for the same information no longer had to recreate the columns themselves.

So we are back to a trade-off, a good ol' friend of any pragmatic programmer. The real question cannot simply be applying DRY whenever duplication arises, but using it as yet another tool to best achieve the goal!