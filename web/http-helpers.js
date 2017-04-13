var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  res.end(asset);
};

exports.handleURLPost = function(request, response) {
    var body = [];
    var that = this;
    request.on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();
      body = body.slice(4);
      archive.addUrlToList(body, function(){
        response.writeHead(302, that.headers);
        response.end('the post worked');
      });
    });
}

exports.makeActionHandler = function(actionMap) {
  return function(request, response) {
    var action = actionMap[request.method];
    if(action) {
      action(request, response);
    } else {
      //exports.sendResponse(response, '', 404);
    }
  };
};



// As you progress, keep thinking about what helper functions you can put here!
