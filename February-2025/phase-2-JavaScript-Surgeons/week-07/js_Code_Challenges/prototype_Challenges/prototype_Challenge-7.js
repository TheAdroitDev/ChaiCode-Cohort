// You need to implement the Employee constructor function and its prototype method

function Employee(name, position, salary) {
    // Initialize name, position, and salary properties
    this.name = name;
    this.position = position;
    this.salary = salary;

}

// Define applyBonus method on Employee's prototype
Employee.prototype.applyBonus = function () {
    this.salary = Math.round(this.salary + this.salary * (percent / 100))
}