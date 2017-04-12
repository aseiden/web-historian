var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

// exports.handleRequest = function (req, res) {

//   res.end(archive.paths.list);
// };



var actions = {
  'GET': function(request, response) {
    //Send response
    fs.readFile('./web/public/index.html', function(err, data) {
      if(err) {
        response.writeHead(500, httpHelpers.headers);
        httpHelpers.serveAssets(response, err);
      } else {
        response.writeHead(200, httpHelpers.headers);
        httpHelpers.serveAssets(response, data);
      }
    })
  },
  'POST': function(request, response) {
    httpHelpers.handleURLPost(request, response);
  },
  'OPTIONS': function(request, response) {
    
  }
};

exports.handleRequest = httpHelpers.makeActionHandler(actions);