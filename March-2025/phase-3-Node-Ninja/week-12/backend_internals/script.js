const fs = require("fs");

const math = require('./index.js')

// fs.writeFile('./test.txt', 'Hello World', () => { })

console.log({ __dirname, __filename });

console.log(math.add(37, 3934));

/*
 function __requireV2(id){
    . ? read user's dir code 
    : find inside internal module   
    ? ok 
    : find inside node modules
    ---throw error
}
*/