const http = require ('http');
const express = require('express');

const app = express();

// const app = function(req,res){
//     switch(req.method){
//         case ('GET'):
//         {
//             if(req.url === "/") return res.end("homePage")
//             if(req.url === "/about-us") return res.end("about-us Page")
//             if(req.url === "/contact") return res.end("contact Page")
//         }
//     break;

//         case('POST'):
//         {

//         }
//     }
//     req.end('Take out that damn response')
// }


app.get('/', (res, res) => res.end('Homepage'))
app.get('/aboutus', (res, res) => res.end('about Page'))
app.get('/contact', (res, res) => res.end('contact Page '))

app.listen(8000, function () {
    console.log('server started');
})


const server = http.createServer(app);
server.listen(8000,function(){
    console.log('server started');
});


