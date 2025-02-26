// You need to implement the Library constructor function and its prototype methods

function Library() {
    // Initialize books property
    this.books = [];
}

// Define addBook method on Library's prototype
Library.prototype.addBook = function(book){
  return this.books.push(book);
}
// Define findBook method on Library's prototype
Library.prototype.findBook = function(title){
  return this.books.includes(title) ? "Book found" : "Book not found"
}