const http = require('http');
const url = require('url');
const static = require('node-static');

const fileServer = new static.Server('./page');

var server = http.createServer(function(request, response) {
	//request.addListener('end',function(){}).resume();
    request.addListener('end', function () {
    	fileServer.serve(request, response);   
    }).resume();
    
}).listen(6000,()=>{
    console.log("Listening on port number 6000");

});
