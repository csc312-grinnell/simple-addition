/**
 * In this file, we'll implement an interpreter for a simple programming
 * language that consists of two language constructs:
 * 
 * +   Numeric literals, e.g., `5`
 * +   Binary addition, e.g., `( 1 + 1 )`
 * 
 * The critical data structure we'll use throughout this course is the _abstract
 * syntax tree_ (AST). An AST is an representation of the program that we can
 * manipulate in our interpreter.
 * 
 * +   It is _abstract_ because in this representation, we strip away
 *     inessential details of the program, e.g., its surface syntax. It is
 *     still a _syntax_ tree, however, because it represents the program
 *     constructs contained in the source code.
 * +   It is a _tree_ because the constructs of a programming language form a
 *     tree-like shape.
 * 
 * In this little language, numbers form the leaves of the tree and addition
 * form the (interior) nodes.
 * 
 * We can concisely represent the syntax of our language using a _grammar_.
 * Here is the grammar for our language:
 * 
 *     <exp> ::= <num> | ( + <exp> <exp> )
 * 
 * This grammar specifies that there is one kind of syntactic construct in our
 * language, an `exp`, short for _expression_. An expression can either be a
 * literal number `num` or an addition expression of the form
 * `( + <exp> <exp> )`.
 */

/**
 * Observe that our AST for expressions is defined in terms of two cases. We
 * case represent this in our interpreter as an algebraic data type! Below,
 * fill in the definition of our `Exp` type. Follow the pattern of an 
 * algebraic datatype here by defining types and constructor functions for
 * the two cases of of an `Exp`—call them `Num` and `Add`, respectively.
 */

export type Num = void  // TODO: replace me!
export function num(value: number): Num {
  // TODO: fill me in!
}

export type Add = void  // TODO: replace me!
export function add(lhs: Exp, rhs: Exp): Add {
  // TODO: fill me in!
}

export type Exp = Num | Add

/**
 * With our AST definitions in hand, let's write some example programs in
 * terms of `Exp` to exercise the definitions as well as serve as values for
 * test cases. Complete the definitions of `e1`, `e2`, and `e3` with
 * appropriate calls to the constructor functions to represent each of the
 * following programs in our language:
 */

// e1 = '5'
export const e1: Exp = num(0)  // TODO: replace me!

// e2 = '( + 1 1 )'
export const e2: Exp = num(0)  // TODO: replace me!

// e3 = '( + ( + 1 2 ) ( + 3 4 ) )'
export const e3: Exp = num(0)  // TODO: replace me!

/**
 * Now, we will implement the passes of our pipeline. We'll start by
 * implementing our transformations over the AST first as they are easier
 * to write. We will then write a simple parser to tie everything together.
 * 
 * First let's tackle interpretation. Interpretation takes an expression and
 * produces the value that the expression evaluates to. We define
 * interpretation recursively on the structure of the AST.
 * 
 * To evaluate an expression `e`:
 * +   If `e` is a number, simple produce the value of that number.
 * +   If `e` is an addition with two subexpressions `e1` and `e2`, evaluate
 *     `e1` and `e2` recursively and produce the addition of those two values.
 * 
 * Complete the definition of `evaluate` below according to this recursive
 * definition. Verify that your implementation passes the test cases in our
 * test suite:
 */

export function evaluate(e: Exp): number {
  // TOOD: fill me in!
  return 0
}

/**
 * Next, we'll implement pretty-printing. Pretty-printing takes an expression
 * and produces a string that is a "readable" version of that expression,
 * usually for debugging purposes. In our case, we'll simply produce the source
 * code that corresponds to the expression. The recursive definition of this
 * function simply follows the grammar given at top of this file.
 * 
 * Complete the definition of `prettyExp` below and ensure that your
 * implementation passes the test cases in the test suite. To implement this
 * function, you will find the _f-string_ feature of Typescript useful. An
 * f-string is a string that contains placeholders for values, allowing you
 * concisely express the functionality of `printf` in C or string concatenation
 * in Java. For example, the following produces a string that contains the
 * result of adding `1 + 1`:
 * 
 *     `The result is ${1 + 1}`
 * 
 * Note that an f-string is enclosed in backticks (\` \`) instead of quotes.
 * Placeholders are specified with `${...}` notation. Inside of the brackets,
 * you can specify an arbitrary expression. The result of that expression will
 * be converted into a string and then substituted for the placeholder!
 */

export function prettyExp(e: Exp): string {
  // TODO: fill me in!
  return ''
}

/**
 * Finally, let's implement a parser for our simple language. It turns out
 * parsing can be tricky to write in an elegant fashion! We'll look at
 * strategies for managing this complexity in the coming weeks. For now, we will
 * put the following constraints on our language to make things digestible:
 * 
 * +   Numbers only consist of single digits.
 * +   There is exactly one space between all non-whitespace characters in the
 *     program.
 * 
 * Typically, we would expect a language to support numbers of arbitrary size
 * and that whitespace is irrelevant in most places in our code.
 * 
 * To parse a program, we must traverse the string linerally. This implies an
 * iterative approach to the problem. However, an AST is a recursive data
 * structure which implies that it might be easiest to operate recursively.
 * 
 * It turns out that best approach to this problem is to combine an iterative
 * and recursive style! We will write a function `parseExp` that ultimately
 * operates in an _imperative recursive_ style. We will maintain as a piece
 * of mutable state, the current index we are inspecting in the source code.
 * However, as we parse sub-expressions in addition, we will make recursive
 * calls to `parseExp`.
 */

/**
 * First, let's define what the state of the parser is. For now, we will simply
 * keep track of the current index we are inspecting in the string that
 * represents the source code. Later, we might record additional information
 * about the source code such as line/column information.
 */
type ParserState = { index: number }

/**
 * Next, let's write a critical function that will make our code much easier
 * to write. In many cases in our parser, we will want to check if the current
 * character is some expected character. If so, we will advance the parser one
 * position forward. Otherwise, we will throw an error stating that the
 * character found was not the one we expected.
 * 
 * Implement the function `chomp` below according to this specification.
 * 
 * +   To index into a string, treat the string like an array and index into
 *     it with `[]` notation. For example, `src[0]` would grab the first
 *     character of `src`.
 * +   To throw an exception, use the `throw` statement. For example,
 *     `throw new Error('msg')` will throw a new `Error` object with the
 *     message `msg`.
 */

/**
 * @param state the current state of the parser
 * @param src the string we are parsing
 * @param target the target character we are chomping 
 * 
 * Checks to see if the character we are analyzing in `src` according to `state`
 * is `target`. If so, advances `state` one character forward. Otherwise, throws
 * an error.
 */
function chomp(st: ParserState, s: string, ch: string): void {
  // TODO: implement me!
}

/**
 * With `chomp` implemented, let's implement our parsing function. Since we
 * always want to parse at the start of the string, but need to pass the state
 * during processing, we'll implement a helper function `parseExpHelper` that
 * the top-level `parseExp` will call with an appropriate initial state.
 * 
 * `parseExpHelper` ultimately acts recursively according to the grammar of our
 * language. It inspects the current character of the string and then based on
 * that character, decides whether to continue parsing as a number or an
 * addition. Fill in the skeleton of `parseExpHelper` below according to this
 * case analysis. Use chomp to advance the parser past expected characters and
 * make recursive calls to `parseExpHelper` to parse subexpressions as needed.
 */

/**
 * @param state the current state of the parser
 * @param src the source code being analyzed
 * @returns the expression parsed starting at the current position `src`
 *          denoted by `state`
 */
function parseExpHelper(state: ParserState, src: string): Exp {
  // If we've already reached the end of the string, raise an error!
  if (state.index >= src.length) {
    throw new Error('Unexpected end of input')
  } else {
    // `ch` is the current character we are analyzing
    let ch = src[state.index]

    // Parsing a number (assumed to be a single digit)
    // Note: we use a regular expression to quickly test if ch is a digit (\d).
    if (/\d/.test(ch)) {
      // TODO: convert `ch` into a digit and return it as a number. You can
      // the `parseInt` function for this purpose. Make sure to advance the
      // parser state before you return!
      return num(0)

    // Parsing an addition expression
    } else if (ch === '(') {
      // TODO: chomp the '( + ' that you expect to see next.
      // TOOD: recursively parse the lhs of the addition
      // TODO: chomp the ' ' that separates the two operands
      // TODO: recursively parse the rhs of the addition
      // TODO: chomp the ' )' that you expect to see next and return
      //       the completed addition expression!
      return num(0)
    } else {
      throw new Error(`Unexpected character: ${ch}`)
    }
  }
}

/**
 * Finally, we can implement `parseExp` in terms of `parseExpHelper`. We do
 * the work for you below. But check to make sure you understand what it is
 * doing!
 */

/**
 * @param src the source to parse
 * @returns the expression parsed from `src
 */
export function parseExp(src: string): Exp {
  const st = { index: 0 }
  const ret = parseExpHelper(st, src)
  // N.B., make sure we completely consume the input when we're done!
  if (st.index !== src.length) {
    throw new Error('Unexpected characters at end of input')
  } else {
    return ret
  }
}