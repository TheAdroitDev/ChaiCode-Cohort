// You just need to implement the findLargest function
function findLargest(a, b, c) {
    // Return the largest among a, b, and c
    if (a > b) {
        return a;
    }
    else if (b > c) {
        return b;
    } else return c;
}
console.log(findLargest(1, 2, 3));
