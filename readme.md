# NodeJS Training : 
In this session, we will delve into understanding Node.js and explore its fundamental workings. Specifically, we will create a basic server and implement a straightforward GET endpoint as an illustrative example.

## Node.js Overview:
Node.js is an open-source, server-side JavaScript runtime environment built on the V8 JavaScript engine. It allows developers to execute JavaScript code on the server, enabling the development of scalable and efficient network applications. Node.js utilizes an event-driven, non-blocking I/O model, making it well-suited for handling concurrent connections.

## HTTP Methods : 
GET: Retrieve data from a specified resource.

POST: Submit data to be processed to a specified resource.

PUT: Update a resource or create a new resource if it doesn't exist.

DELETE: Request the removal of a resource.

### Difference between GET and POST : 

Purpose:

   GET: Primarily used to request data from a specified resource. It's a "safe" method, meaning it should not have the side effect of modifying data on the server.<br/>
   POST: Used to submit data to be processed to a specified resource. It's often used when uploading a file or submitting a form.<br/>

Data Handling:

  GET: Parameters are included in the URL. Limited amount of data can be sent, and it's visible in the URL.<br/>
  POST: Parameters are included in the request body. Can handle larger amounts of data, and it's not visible in the URL.<br/>

Security:

  GET: Data is visible in the URL, which can be a security risk, especially for sensitive information like passwords.<br/>
  POST: Data is included in the request body, making it more secure for sensitive information.

## Creating a Simple Server with a GET Endpoint:
To begin, we'll initiate a simple Node.js server and implement a GET endpoint. Node.js comes with a built-in http module that facilitates the creation of servers. Here's a step-by-step breakdown: 

```
//This line imports the Node.js built-in http module, which provides functionality to create HTTP servers and clients.
const http = require('node:http');

// Define the hostname and port on which the server will listen
const hostname = '127.0.0.1';
const port = 3000;

// Create an HTTP server using the createServer method
const server = http.createServer((req, res) => {
  // Callback function that will be invoked for each incoming HTTP request

  // Set the HTTP status code to 200 (OK)
  res.statusCode = 200;

  // Set the response header to indicate the content type as plain text
  res.setHeader('Content-Type', 'text/plain');

  // Send the "Hello World" message as the response body
  res.end('Hello World');
});

// Make the server listen on the specified port and hostname
server.listen(port, hostname, () => {
  // Callback function that will be invoked once the server is listening

  // Print a message to the console indicating the server is running
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

## Creating a Simple Server with multiple Endpoints:
```
const http = require('node:http');

const hostname = '127.0.0.1';
const port = 4000;


const server = http.createServer((req, res) => {
  if(req.method == 'GET' && req.url =='/text')
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
  else if(req.method == 'GET' && req.url =='/json'){{
    let data = {firstname:"Rami",lastname:"Chargui"}
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data)) //Converts a JavaScript object or value into a JSON string.
  }
  else if(req.method == 'POST' && req.url=="/post")
   {
      let sendedData = ''

      req.on('data',(chunk)=>{
          sendedData = sendedData + chunk
      })

      req.on('end',()=>{
        console.log(sendedData)
      })
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
