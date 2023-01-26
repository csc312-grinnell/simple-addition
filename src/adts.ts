/**
 * In this file, you'll learn about a key programming concept, the algebraic
 * datatype (ADT for short). Typescript doesn't have a specific language
 * construct to define an ADT, but we can follow a _pattern_ that employs
 * Typescript's union types feature to achieve the same effect.
 *
 * An algebraic datatype, also know as a discriminated union, is a type that
 * can take on one of several possible values. Each value is a simple
 * aggregate, a collection of fields, along with some _tag_ value that can be
 * inspected at runtime to determine what kind of value it is.
 */

/**
 * The classic example of an ADT that you have seen before but didn't consider
 * as such is the recursive representation of a list. Recall that a list can
 * be defined recursively as follows:
 *
 * A list is either:
 * +   Empty (`nil`), or
 * +   Non-empty (`cons`), with a head value and a tail list.
 *
 * The list, itself, is our ADT and the empty list, `nil` and the non-empty
 * list `cons` are our two possible kinds of list values.
 *
 * In typed functional languages, an ADT is a language construct we can write
 * directly. For example, in the Haskell programming language, here is the
 * definition of a generic list type:
 *
 *     data List a = Nil | Cons a (List a)
 *
 * Where `a` is the generic type variable. This compact definition defines
 * several things for us in Haskell:
 *
 * +   A type, `List a`
 * +   Two _constructors_, `Nil` and `Cons`, that are functions that create a
 *     nil and cons value, respectively.
 *
 * In Typescript, we can't write an ADT definition directly, but we can employ
 * the following design pattern to emulate it:
 *
 * +   For each possible value of the ADT, define a type that represents it.
 *     This type should contain a field that serves as the tag value, a unique
 *     identifier for that value.
 * +   Define a simple function that, given arguments to store in an ADT value,
 *     creates that value.
 * +   Define a type for the overall ADT that is the union of its possible
 *     value types.
 *
 * Here is the pattern in action for the list ADT:
 */

export type Nil<T> = { tag: 'nil' }
export function nil<T>(): Nil<T> {
  return { tag: 'nil' }
}

export type Cons<T> = { tag: 'cons', head: T, tail: List<T> }
export function cons<T>(head: T, tail: List<T>): Cons<T> {
  return { tag: 'cons', head: head, tail: tail }
}

type List<T> = Nil<T> | Cons<T>

/**
 * Observe the following details about this implementation:
 * +   For each of the two possible ADT values, we define (a) a type and a
 *     (b) a function that acts as a construct for that type. By convention,
 *     we name the constructor function the same as the type, but in camel
 *     case rather than title case.
 *
 * +   The two ADT values are defined as records with a `tag` field. We will
 *     check this `tag` field to determine whether a given list is either
 *     `nil` or `cons`.
 * 
 * +   Observe the _type_ of the `tag` field in each case. It is easy to miss
 *     this fact, but we defined the type to be a _string literal_, not just
 *     `string`. For example, the `Nil` type has a `tag` field of type
 *     `'cons'`! Typescript will enforce that for any value of type `Cons<T>`
 *     its `tag` field is _exactly_ the string `'cons'`.
 * 
 * This final point is the reason why it is reasonable to implement ADTs in
 * Typescript. As we shall see shortly, the Typescript typechecker is smart
 * enough to enforce this strong constraint on the `tag` field and refine the
 * type of a List<T> if it can prove the identity of a list's `tag` field.
 */

/**
 * Now, let's observe how we can use this ADT to write a function. Recall the
 * standard recursive definition of a list's length:
 * 
 *    length(nil()) = 0
 *    length(cons(head, tail)) = 1 + length(tail)
 * 
 * To implement this case analysis-style behavior, we simply need to check
 * the `tag` field of our `List<T>` to determine which of its two possible
 * values we possess. We can do this with a standard `if` statement, but in
 * many cases, a `switch` statement looks cleaner:
 */

/** @returns the length of the input list */
export function length<T>(list: List<T>): number {
  switch (list.tag) {
    case 'nil':
      return 0
    case 'cons':
      return 1 + length(list.tail)
  }
}

/**
 * Putting it all together, we can define a list by chaining calls of `nil`
 * and `cons` together and then compute the length of that list. Feel free
 * to compile (npm run build) and run this file (node dist/adts.js) to see
 * this output.
 */

const exampleList = cons(1, cons(2, cons(3, nil())))
console.log(length(exampleList))    // prints 3

/**
 * Now that we have seen how to define and use ADTs in Typescript. Let's look
 * at the benefits of them. Below are some bad implementations of length that
 * give type errors at compile time. This implies that Typescript's type system
 * is protecting us from some mistakes!
 * 
 * Uncomment each of the functions and observe the type error you receive.
 * Below each function:
 * 
 * (a) Copy the type error the compiler spits out.
 * (b) In a sentence or two, explain what the error in the code is and how it
 *     relates to the type error that you receive from the compiler?
 * 
 * Make sure to comment each of the functions again when you are done so that
 * the project continues to compile. You can quickly uncomment and comment code
 * in VSCode by highlighting the code and using ctrl/cmd + /.
 */

// function badLength1<T> (list: List<T>): number {
//   switch (list.tag) {
//     case 'nil':
//       return 1 + length(list.tail)
//     case 'cons':
//       return 0
//   }
// }

/**
 * badLength2:
 * (a) type error: ...
 * (b) explanation: ...
 */

// function badLength2<T> (list: List<T>): number {
//   switch (list.tag) {
//     case 'cons':
//       return 1 + length(list.tail)
//   }
// }

/**
 * badLength2:
 * (a) type error: ...
 * (b) explanation: ...
 */

/**
 * Finally, let's have you try porting over a recursive list functions on your
 * own so you can get a sense of how to perform operations over these ADTs.
 * Implement the following functions below, following these recursive
 * definitions:
 * 
 *   append(nil(), l2) = l2
 *   append(cons(head, tail), l2) = cons(head, append(tail, l2))
 * 
 *   dup(nil()) = nil()
 *   dup(cons(head, tail)) = cons(head, cons(head, dup(tail)))
 */

/** @returns a new list obtained by concatenating `l2` onto the end of `l1`. */
export function append<T>(l1: List<T>, l2: List<T>): List<T> {
  // TODO: implement me!
  return l1
}

/** @returns a new list obtained by duplicating every element of `l` once. */
export function dup<T>(l: List<T>): List<T> {
  // TODO: implement me!
  return l
}