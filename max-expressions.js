exports.parse = function(exprString) {
    const ast = parse(exprString)

    return {
        evaluate: function(parameters) {
            try {
                return evaluate(ast, parameters)
            } catch (error) {
                return false
            }
        }
    }
}

const operators = [
    ' and ',
    ' or ',
    ' is more than ',
    ' is less than ',
    ' is not ',
    ' is '
]

function parse(str) {
    for (var i = 0; i < operators.length; i++) {
        var operator = operators[i]
        var index = str.indexOf(operator)
        if (index === -1) continue

        return {
            type: operator,
            left: parse(str.slice(0, index)),
            right: parse(str.slice(index + operator.length, str.length))
        }
    }

    return {
        value: str
    }
}

function evaluate(ast, parameters) {
    if (ast.type === ' and ') {
        return evaluate(ast.left, parameters) && evaluate(ast.right, parameters)
    }

    if (ast.type === ' or ') {
        return evaluate(ast.left, parameters) || evaluate(ast.right, parameters)
    }

    if (ast.type === ' is more than ') {
        const left = parseFloat(evaluate(ast.left, parameters))
        const right = parseFloat(evaluate(ast.right, parameters))
        return left > right
    }

    if (ast.type === ' is less than ') {
        const left = parseFloat(evaluate(ast.left, parameters))
        const right = parseFloat(evaluate(ast.right, parameters))
        return left < right
    }

    if (ast.type === ' is not ') {
        return evaluate(ast.left, parameters) !== evaluate(ast.right, parameters)
    }

    if (ast.type === ' is ') {
        return evaluate(ast.left, parameters) === evaluate(ast.right, parameters)
    }

    if (ast.value in parameters) {
        return parameters[ast.value].toString()
    }

    return ast.value
}
