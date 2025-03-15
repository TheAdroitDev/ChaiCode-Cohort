# Foundation Clases A Full and fast Revision of JavaScript
## Topics Covered [IN SHORT]
### 1. DOM
### 2. Polyfills
### 3. Prototypes
### 4. Machine Coding
### 5. JS Behind The scenes
### 6. Function and concepts

# Foundation Classes: A Full and Fast Revision of JavaScript

## Topics Covered

### 1. DOM (Document Object Model)
The DOM is a programming interface for web documents. It represents the page structure as a tree, allowing JavaScript to manipulate elements dynamically.

- **Selecting Elements**: `document.getElementById()`, `document.querySelector()`
- **Modifying Elements**: `.innerText`, `.innerHTML`, `.setAttribute()`
- **Event Handling**: `.addEventListener()`
- **Creating and Removing Elements**: `document.createElement()`, `element.appendChild()`, `element.removeChild()`

### 2. Polyfills
Polyfills are JavaScript code snippets that provide modern functionality in older browsers that do not support them.

- Example: Implementing `Array.prototype.map()` polyfill:
  ```js
  if (!Array.prototype.map) {
    Array.prototype.map = function(callback) {
      let newArray = [];
      for (let i = 0; i < this.length; i++) {
        newArray.push(callback(this[i], i, this));
      }
      return newArray;
    };
  }
  ```

### 3. Prototypes
Prototypes allow JavaScript objects to inherit properties and methods.

- **Prototype Chain**: Every object in JavaScript has a prototype.
- **Example**:
  ```js
  function Person(name) {
    this.name = name;
  }
  Person.prototype.greet = function() {
    console.log(`Hello, my name is ${this.name}`);
  };
  let user = new Person("John");
  user.greet();
  ```

### 4. Machine Coding
Machine coding refers to implementing real-world problem solutions with structured, efficient, and scalable JavaScript code.

- **Example: Implementing a simple debounce function**:
  ```js
  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }
  ```

### 5. JS Behind The Scenes
JavaScript engines execute code using mechanisms like:

- **Call Stack**: Handles function execution.
- **Event Loop**: Manages asynchronous operations.
- **Web APIs & Callback Queue**: Allows handling async tasks like setTimeout, fetch, etc.

Example:
```js
console.log("Start");
setTimeout(() => console.log("Async Task"), 1000);
console.log("End");
```
(Output will be: Start -> End -> Async Task)

### 6. Functions and Concepts
- **Higher-Order Functions**: Functions that accept other functions as arguments or return functions.
  ```js
  function multiplier(factor) {
    return function (num) {
      return num * factor;
    };
  }
  const double = multiplier(2);
  console.log(double(5)); // 10
  ```

- **Closures**: A function that remembers its outer variables even after execution.
  ```js
  function outer() {
    let count = 0;
    return function inner() {
      count++;
      console.log(count);
    };
  }
  const counter = outer();
  counter(); // 1
  counter(); // 2
  ```

This document serves as a quick revision of key JavaScript concepts!
