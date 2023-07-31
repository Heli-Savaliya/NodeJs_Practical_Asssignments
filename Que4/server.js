const WebSocket = require('ws')
var http = require('http');
var fs = require('fs');
const port = 8080;
var httpserver = http.createServer(function (request, response) {
  if (request.url == "/") {
    fs.readFile("./public/index.html", (err, data) => {
      response.write(data)
      response.end();
    })
  }
}).listen({port}, function () {
  console.log((new Date()) +
    `Server is listening on http://localhost:${port}`);
});
const wss = new WebSocket.Server({ server: httpserver })
wss.on("connection", (clientws) => {
  clientws.send("Hello Client")
  clientws.on("message", (msg) => {
    console.log("Received " + msg)
    clientws.send("Received " + msg)
  })
})