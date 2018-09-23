import test from 'ava'
import { parse } from './max-expressions'

test('x is 5', t => {
    const expr = parse('x is 5')
    t.is(expr.evaluate({ x: '5' }), true)
    t.is(expr.evaluate({ x: 5 }), true)
    t.is(expr.evaluate({ x: '10' }), false)
    t.is(expr.evaluate({ y: '5' }), false)
    t.is(expr.evaluate(), false)
})

test('x is Cliff', t => {
    const expr = parse('x is Cliff')
    t.is(expr.evaluate({ x: 'Cliff' }), true)
    t.is(expr.evaluate({ x: 'cliff' }), false)
    t.is(expr.evaluate({ y: 'Cliff' }), false)
    t.is(expr.evaluate(), false)
})

test('x is 5 and y is 6', t => {
    const expr = parse('x is 5 and y is 6')
    t.is(expr.evaluate({ x: 5, y: 6 }), true)
    t.is(expr.evaluate({ x: 5, y: 10 }), false)
    t.is(expr.evaluate({ x: 6, y: 6 }), false)
    t.is(expr.evaluate({ x: 5 }), false)
    t.is(expr.evaluate({ y: 6 }), false)
    t.is(expr.evaluate(), false)
})

test('x is 5 or y is 6', t => {
    const expr = parse('x is 5 or y is 6')
    t.is(expr.evaluate({ x: 5, y: 6 }), true)
    t.is(expr.evaluate({ x: 5, y: 10 }), true)
    t.is(expr.evaluate({ x: 6, y: 6 }), true)
    t.is(expr.evaluate({ x: 5 }), true)
    t.is(expr.evaluate({ y: 6 }), true)
    t.is(expr.evaluate({ x: 6 }), false)
    t.is(expr.evaluate({ y: 10 }), false)
    t.is(expr.evaluate(), false)
})

test('x is more than 5', t => {
    const expr = parse('x is more than 5')
    t.is(expr.evaluate({ x: 25 }), true)
    t.is(expr.evaluate({ x: 5 }), false)
    t.is(expr.evaluate({ x: -25 }), false)
})

test('x is less than 5', t => {
    const expr = parse('x is less than 5')
    t.is(expr.evaluate({ x: 25 }), false)
    t.is(expr.evaluate({ x: 5 }), false)
    t.is(expr.evaluate({ x: -25 }), true)
})

test('x is 5 and y is 6 or y is 10', t => {
    const expr = parse('x is 5 and y is 6 or y is 10')
    t.is(expr.evaluate({ x: 5, y: 6 }), true)
    t.is(expr.evaluate({ x: 5, y: 10 }), true)
    t.is(expr.evaluate({ x: 10, y: 10 }), false)
    t.is(expr.evaluate({ x: 6, y: 6 }), false)
    t.is(expr.evaluate({ x: 5 }), false)
    t.is(expr.evaluate({ y: 6 }), false)
    t.is(expr.evaluate({ y: 10 }), false)
    t.is(expr.evaluate(), false)
})

test('x is not 5', t => {
    const expr = parse('x is not 5')
    t.is(expr.evaluate({ x: 25 }), true)
    t.is(expr.evaluate({ x: 5 }), false)
})

test('#giraffe is James or #giraffe is Peter', t => {
    const expr = parse('#giraffe is James or #giraffe is Peter')
    t.is(expr.evaluate({ '#giraffe': 'James' }), true)
    t.is(expr.evaluate({ '#giraffe': 'Peter' }), true)
    t.is(expr.evaluate({ '#giraffe': 'Mary' }), false)
    t.is(expr.evaluate({ 'giraffe': 'Jame' }), false)
    t.is(expr.evaluate(), false)
})
