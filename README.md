# Lab 02: A Simple Addition Interpreter

In this lab, we will implement our first "compiler," a simple interpreter for a programming language that has numbers and an addition operator.
While simplistic, this interpreter implements a full compilation pipeline with the following passes:

1.  Source code to an abstract syntax tree, _i.e._, _parsing_.
2.  Abstract syntax tree back to source code, _i.e._, _pretty-printing_.
2.  Abstract syntax tree to a final value, _i.e._, _interpretation_.

For the remainder of the semester, we will gradually build on these humble beginnings, adding more complexity in the form of additional passes and language features.

To complete this lab, complete the following files:

1.  `adts.ts` introduces the _algebraic datatype_ features of Typescript, an essential ingredient to elegant compiler construction.
2.  `simple-addition.ts` introduces the _abstract syntax tree_ (AST), the primary structure we manipulate in language tools.
    It also contains instructions for implementing our simple addition interpreter.

Once you have completed `simple-addition.ts`, complete the following additional exercises to enhance your interpreter:

# Enhancement #1: Other Operators

Add in support for the other binary operators, `-`, `*`, and `/`.
The concrete syntax of your language will then become:

~~~
e ::= n | ( + e1 e2 ) | ( - e1 e2 ) | ( * e1 e2 ) | ( / e1 e2 )
~~~

To do so:

+   Extend your `Exp` datatype with appropriate alternatives for each of these operators.
+   Extend `evaluate`, `prettyExp`, and `parseExp` to handle these additional operators.
+   Add appropriate test cases to `test/test.ts` for each operator.

In your implementation, your operators should proceed over _integers_.
Thus, you should take advantage of `Math.floor` to get the effect of truncation in the case of division.

# Enhancement #2: Booleans

So far, our interpreter only supports numbers.
We can easily add other basic types to our interpreter!
Try adding _booleans_ to our language, extending the concrete syntax to:

~~~
e ::= n | ( + e1 e2 ) | ( - e1 e2 ) | ( * e1 e2 ) | ( / e1 e2 )
    | true | false | ( < e1 e2 ) | ( if e1 e2 e3 )
~~~

To support booleans, we add the following syntactic forms:

+   _Boolean literals_, `true`, and `false`.
+   _Less than comparison_ of two expressions.
+   _If-expressions_.

Like the additional arithmetic operators, you should:

+   Extend `Exp` with appropriate alternatives for each of these forms.
+   Extend `evaluate`, `prettyExp`, and `parseExp` to handle these forms.
+   Add appropriate test cases to `test/test.ts`.

Unlike the additional arithmetic operators, you have some more considerations to make!

+   The current version of `evaluate` returns a `number`.
    With booleans this return type _may_ or _may not_ be sufficient.
    You get to make a _language design decision_ at this point!
    How will your `evaluate` function represent the fact that evaluation produces multiple types?
    There are two solutions to this problem:

    1.  The _C approach_ is to represent booleans as numbers so no change to the return type of `evaluate` is necessary.
    2.  The _Scheme approach_ is to use a different type for `evaluate` that captures the fact that the returned value can either be a `number` or a `boolean`.

    In this lab, you may choose either of these approaches to implement in your interpreter.
    Note that each approach has its upsides and downsides in terms of ease of implementation and the resulting semantics of your language.
    Before you choose a path, discuss with your partner what the pros and cons are and check with a member of the course staff about your decision.

+   Parsing `true`, `false`, and `if` is slightly more complicated than parsing the single character tokens the language handles so far.
    Take advantage of the fact that inspecting the next character of the source file unambiguously tells us what to expect next, _e.g._, a `t` means that we should expect `true`.
    Additionally, implementing a variant of `chomp` that tries to `chomp` a whole word instead of a single character is useful here.

+   `if`-expressions are a bit more complicated to evaluate than the other binary operations.
    Recall from CSC 151, you learned that `if`-expressions have the following semantics.
    If we have an `if` of the form `(if e1 e2 e3)`:

    +   If `e1` evaluates to `true` then the `if` evaluates to whatever `e2` evaluates to.
    +   If `e1` evaluates to `false` then the `if` evaluates to whatever `e3` evaluates to.

# Enhancement #3 (Optional): Better Parsing

Our parsing was originally quite limited, but parsing the extra syntactic forms of booleans suggests that it isn't much work to do better!
The arithmetic fragment of our language only accepts single digits and single whitespace between meaningful characters.
Extend `parseExp` so that we parse:

+   Numeric literals of an arbitrary sequence of digits.
+   Arbitrary whitespace between meaningful sequences of characters, _i.e._, _tokens_, in our program.

You can even try to parse other kinds of numeric literals, _e.g._, negative numbers and floating point numbers as well!

# Enhancement #4 (Optional): Other Arithmetic and Boolean Operators

There are many other arithmetic and boolean operators you can consider implementing:

+   `%` the arithmetic modulus operator.
+   `>`, `<`, _etc._, other numeric literal comparisons
+   `&&`, `||`, logical-and and logical-or.
+   `!`, logical negation.

And so forth.
Feel free to implement any subset of them.
At some point, you will start feeling the pain of repetitive coding, if you did not already do so!
Refactor your code to elegantly handle this repetition, to the best of your ability!
