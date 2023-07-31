// const http = require('http');
// const fs = require('fs');
// const url = require('url');

// const server = http.createServer((req, res) => {
//     var u1 = url.parse(req.url,true); //parseQueryString <boolean> If true, the query property will always be set to an object returned by the querystring module's parse() method. If false, the query property on the returned URL object will be an unparsed, undecoded string. Default: false.
    
    
    
//     if (req.url === "/gethello" && req.method === 'GET') {
//         res.writeHead(200, { 'Content-Type': 'text/plain' });
//         res.end("Hello NodeJS!!");
//     } 
//     else if (req.url=="/que_2_content.html" && req.method === 'GET')
//     {
//             var filename = "que_2_content.html";
//             fs.readFile(filename, function(err, data) {
//             if (err) {
//               res.writeHead(404, {'Content-Type': 'text/html'});
//               return res.end("404 Page Not Found");
//             } 
            
//             res.writeHead(200, {'Content-Type': 'text/html'});
//             res.write(data);
//             return res.end();
//             });    
//     }
//     else 
//     {
//         res.write("/ is not allowed to access!!!");
//         return res.end();
//     }
// });
// server.listen(9000,()=>{
//     console.log("server listening on port no. 9000");
// });

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === "/gethello" && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Hello NodeJS!!");
  } else if (req.url === "/que_2_content.html" && req.method === 'GET') {
    // const filePath = path.join(__dirname, "que_2_content.html");
    fs.readFile("que_2_content.html", (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end("Error reading the file");
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("404 Page1 Not Found");
  }
});

const port = 9000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
