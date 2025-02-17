function invertedMountain(n) {
    let mountain = '';
    for (let i = n; i >= 1; i--) {
      mountain += '*'.repeat(i);
      if (i > 1) {
        mountain += '\n'; // Only add a newline if it's not the last row
      }
    }
    return mountain;
  }
  

console.log(invertedMountain(10))