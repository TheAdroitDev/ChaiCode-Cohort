function ShoppingCart() {
    // Initialize items property
    this.items = [];
}

// Define addItem method on ShoppingCart's prototype
ShoppingCart.prototype.addItem = function(price){
    this.items.push(price);
}
// Define getTotalPrice method on ShoppingCart's prototype
ShoppingCart.prototype.getTotalPrice = function(){
  return this.items.reduce((acc,ini)=>{ 
    return acc + ini
  },0)
}