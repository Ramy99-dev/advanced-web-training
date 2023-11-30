const http = require('node:http');

const hostname = '127.0.0.1';
const port = 4000;


const server = http.createServer((req, res) => {
  if(req.method == 'GET' && req.url =='/')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
  }
  else if(req.method == 'GET' && req.url =='/html'){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>hello World</h1>')
  }
  else{
    let data = {firstname:"Rami",lastname:"Chargui"}
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data)) //Converts a JavaScript object or value into a JSON string.
  }
  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});