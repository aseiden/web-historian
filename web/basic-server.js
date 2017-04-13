var http = require('http');
var handler = require('./request-handler');
var initialize = require('./initialize.js');
var url = require('url');
var urlhandler = require('./archivedurl-handler');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize('./archives');

var port = 8080;
var ip = '127.0.0.1';

var router = {
  '/': handler.handleRequest,
};

var server = http.createServer(function(request, response) {
  var route = router[url.parse(request.url).pathname]
  if(route) {
    route(request, response);
  } else {
    urlhandler.handleRequest(request, response);
  }
});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log('Listening on http://' + ip + ':' + port);
}
