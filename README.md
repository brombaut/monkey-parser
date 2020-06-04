# Monkey Parser
![npm (scoped)](https://img.shields.io/badge/dynamic/json?color=informational&label=npm&prefix=v&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2Fbrombaut%2Fmonkey-parser%2Fmaster%2Fpackage.json)

Port to TypeScript of the components from "Writing An Interpreter In Go" by Thorsten Bell for generating an AST.

## Install

```bash
$ npm install @brombaut/monkey-parser
```

## Usage

```JavaScript
const parser = require('@brombaut/monkey-parser');
const input = `
  let x = 1;
  let y = 2;
  let add = fn(a, b) { return a + b };
  let result = add(x, y);
`;
parser.parse(input);
if (parser.errors().length > 0) {
  parser.errors().forEach(console.error);
} else {
  const ast = parser.ast();
  console.log(ast);
}
```

## The Monkey Programming Language
Below are some code examples that showcase the language features of Monkey.

### What Monkey looks like.
``` JavaScript
// Bind values to names with let-statements
let version = 1;
let name = "Monkey programming language";
let myArray = [1, 2, 3, 4, 5];
let coolBooleanLiteral = true;

// Use expressions to produce values
let awesomeValue = (10 / 2) * 5 + 30;
let arrayWithValues = [1 + 1, 2 * 2, 3];
```

### Monkey supports recursive functions, conditionals, implicit and explicit returning of values.
```JavaScript
// Define a `fibonacci` function
let fibonacci = fn(x) {
  if (x == 0) {
    0                // Monkey supports implicit returning of values
  } else {
    if (x == 1) {
      return 1;      // ... and explicit return statements
    } else {
      fibonacci(x - 1) + fibonacci(x - 2); // Recursion
    }
  }
};
```

### Monkey supports any combination of the following data types: booleans, strings, hashes, integers and arrays.
```JavaScript
// Here is an array containing two hashes, that use strings as keys 
// and integers and strings as values
let people = [{"name": "Anna", "age": 24}, {"name": "Bob", "age": 99}];

// Getting elements out of the data types is also supported.
// Here is how we can access array elements by using index expressions:
fibonacci(myArray[4]);
// => 5

// We can also access hash elements with index expressions: 
let getName = fn(person) { person["name"]; };

// And here we access array elements and call a function with the element as argument: 
getName(people[0]); // => "Anna"
getName(people[1]); // => "Bob"
```

### Functions are first-class citizens, and higher-order functions are supported.
```JavaScript
// Define the higher-order function `map`, that calls the given function `f` on 
// each element in `arr` and returns an array of the produced values. 
let map = fn(arr, f) {
  let iter = fn(arr, accumulated) {
    if (len(arr) == 0) {
      accumulated
    } else {
      iter(rest(arr), push(accumulated, f(first(arr))));
    }
  };

  iter(arr, []);
};

// Now let's take the `people` array and the `getName` function from above 
// and use them with `map`.
map(people, getName); // => ["Anna", "Bob"]
```

### Monkey supports closures.
```JavaScript
// newGreeter returns a new function, that greets a `name` with the given 'greeting`.
let newGreeter = fn(greeting) {
  // `puts` is a built-in function we add to the interpreter
  return fn(name) { puts(greeting + " " + name); }
};

// `hello` is a greeter function that says "Hello"
let hello = newGreeter("Hello");

// Calling it outputs the greeting:
hello("dear, future Reader!"); // => Hello dear, future Reader!
```

## Links to the book's websites

[Interpreter Book](https://interpreterbook.com/) 

[Compiler Book](https://compilerbook.com/)
