# Lab 02: A Simple Addition Interpreter

In this lab, we will implement our first "compiler," a simple interpreter for a programming language that has numbers and an addition operator.
While simplistic, this interpreter implements a full compilation pipeline with the following passes:

1.  Source code to an abstract syntax tree, _i.e._, _parsing_.
2.  Abstract syntax tree back to source code, _i.e._, _pretty-printing_.
2.  Abstract syntax tree to a final value, _i.e._, _interpretation_.

For the remainder of the semester, we will gradually build on these humble beginnings, adding more complexity in the form of additional passes and language features.

The file `src/simple-addition.ts` contains instructions for implementing our simple addition interpreter.
Complete the definitions in the file, ensure that your code passes the test suite found in `test/test.ts`, and then tu