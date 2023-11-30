# NodeJS Training : 
In this session, we will delve into understanding Node.js and explore its fundamental workings. Specifically, we will create a basic server and implement a straightforward GET endpoint as an illustrative example.

## Node.js Overview:
Node.js is an open-source, server-side JavaScript runtime environment built on the V8 JavaScript engine. It allows developers to execute JavaScript code on the server, enabling the development of scalable and efficient network applications. Node.js utilizes an event-driven, non-blocking I/O model, making it well-suited for handling concurrent connections.

## Creating a Simple Server with a GET Endpoint:
To begin, we'll initiate a simple Node.js server and implement a GET endpoint. Node.js comes with a built-in http module that facilitates the creation of servers. Here's a step-by-step breakdown: 

```
const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

## Creating a Simple Server with multiple Endpoints:
```
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
```
---
## HTTP Status:
    200: Request successful
    301 and 302: Redirection, permanent and temporary, respectively
    401: Unauthorized user
    403: Access denied
    404: Resource not found
    500, 502, and 503: Server errors
    504: The server did not respond