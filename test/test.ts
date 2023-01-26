import { describe, expect, test } from '@jest/globals'
import * as List from '../src/adts'
import { e1, e2, e3, evaluate, prettyExp, parseExp } from '../src/simple-addition'

describe('adts.ts', () => {
  const l1 = List.nil()
  const l2 = List.cons('a', List.cons('b', List.cons('c', List.nil())))
  const l3 = List.cons('d', List.cons('e', List.nil()))
  test('length (empty)', () => {
    expect(List.length(l1)).toBe(0)
  })
  test('length (non-empty)', () => {
    expect(List.length(l2)).toBe(3)
  })
  test('length (empty)', () => {
    expect(List.length(l1)).toBe(0)
  })
  test('length (non-empty)', () => {
    expect(List.length(l2)).toBe(3)
  })
  // N.B., we use toStrictEqual because we want the output list to be
  // structurally equal to the expected list, not identical objects (===).
  test('append (empty)', () => {
    expect(List.append(l1, l2)).toStrictEqual(l2)
  })
  test('append (non-empty', () => {
    expect(List.append(l2, l3)).toStrictEqual(
      List.cons('a', List.cons('b', List.cons('c', List.cons('d', List.cons('e', List.nil())))))
    )
  })
  test('dup (empty)', () => {
    expect(List.dup(l1)).toStrictEqual(l1)
  })
  test('non-empty (empty)', () => {
    expect(List.dup(l2)).toStrictEqual(
      List.cons('a', List.cons('a', List.cons('b', List.cons('b', List.cons('c', List.cons('c', List.nil()))))))
    )
  })
})

// TODO: uncomment me when you're ready for `simple-addition.ts`!

// describe('simple-addition.ts', () => {
//   test('evaluate(e1)', () => {
//     expect(evaluate(e1)).toBe(5)
//   })
//   test('evaluate(e2)', () => {
//     expect(evaluate(e2)).toBe(2)
//   })
//   test('evaluate(e3)', () => {
//     expect(evaluate(e3)).toBe(10)
//   })
//   test('prettyExp(e1)', () => {
//     expect(prettyExp(e1)).toBe('5')
//   })
//   test('prettyExp(e2)', () => {
//     expect(prettyExp(e2)).toBe('( + 1 1 )')
//   })
//   test('prettyExp(e3)', () => {
//     expect(prettyExp(e3)).toBe('( + ( + 1 2 ) ( + 3 4 ) )')
//   })
//   test(`parseExp(e1)`, () => {
//     expect(parseExp('5')).toStrictEqual(e1)
//   })
//   test(`parseExp(e2)`, () => {
//     expect(parseExp('( + 1 1 )')).toStrictEqual(e2)
//   })
//   test(`parseExp(e3)`, () => {
//     expect(parseExp('( + ( + 1 2 ) ( + 3 4 ) )')).toStrictEqual(e3)
//   })
// })