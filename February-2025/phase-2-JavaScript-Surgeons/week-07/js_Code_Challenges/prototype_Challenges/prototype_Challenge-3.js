function Counter() {
    // Initialize count property
    this.count = 0;
}

// Define increment method on Counter's prototype
Counter.prototype.increment = function (){
  this.count += 1;
  return this.count
}
// Define decrement method on Counter's prototype
Counter.prototype.decrement = function(){
  this.count -= 1;
  return this.count
}