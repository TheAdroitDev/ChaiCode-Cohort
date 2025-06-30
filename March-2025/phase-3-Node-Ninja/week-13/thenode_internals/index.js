const fs = require('fs')
const crypto = require('crypto');

setTimeout(() => { console.log('Set Timeout') }, 0);

setImmediate(() => { console.log('Set Immediate') }, 0);

process.env.UV_THREADPOOL_SIZE = 10;
console.log('Hello index.js');

// fs.readFile('sample.txt', 'utf-8', function (err, data) {
    setTimeout(() => { console.log('setTimeout'), 0 })
    setImmediate(() => { console.log('Immediate') })

   /*  const start = Date.now();

    crypto.pbkdf2('password','salt1',100000,1024,'sha512',(err,data)=>{
        console.log(`[${Date.now() - start}ms]: Password 1 Hashed!`);  
    })
    crypto.pbkdf2('password','salt1',100000,1024,'sha512',(err,data)=>{
        console.log(`[${Date.now() - start}ms]: Password 2 Hashed!`);  
    }) */
// })

