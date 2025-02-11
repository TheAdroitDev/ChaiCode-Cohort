// You just need to implement the calculator function
function calculator(num1, num2, operator) {
    // Perform basic arithmetic operations using switch case
    switch (operator) {
        case "+": return (num1 + num2);
        case "-": return (num1 - num2);
        case "*": return (num1 * num2);
        case "/": return (num2 !== 0 ? (num1 / num2) : "Cannot divide by zero")
        default: return "Invalid Operator";
    }
}