# max-expressions

Super friendly, human readable boolean expressions

## Installation

```
yarn add -D max-expressions
```

## Usage

```JavaScript
import { parse } from 'max-expressions'

let expr = parse('x is 5 and y is more than 20')
expr.evaluate({ x: 5, y: 25 }) // true
expr.evaluate({ x: 7, y: 30 }) // false

expr = parse('#giraffe is James or #giraffe is Peter')
expr.evaluate({ '#giraffe': 'James' }) // true
```
