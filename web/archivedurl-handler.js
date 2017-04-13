var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

// exports.handleRequest = function (req, res) {

//   res.end(archive.paths.list);
// };

exports.handleRequest = function(request, response) {
  if (request.method === 'GET') {
    //get the url
    //check if its in our archive
    archive.isUrlArchived(request.url, function(exists) {
      if (exists) {
        archive.getHTML(request.url, function(data) {
          response.writeHead(200, httpHelpers.headers);
          response.end(data);
        })
      } else {
        response.writeHead(404, httpHelpers.headers);
        response.end('404 file not found');
      }
    });
  }
}
