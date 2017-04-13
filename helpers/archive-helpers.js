var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  loading: path.join(__dirname, '../web/public/loading.html')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(this.paths.list, "utf-8", function(err, data) {
    if (err) {
      throw err;
    } else {
      var dataArr = data.split('\n');
      callback(dataArr);
    }
  })
};

exports.isUrlInList = function(url, callback) {
  this.readListOfUrls(function(data) {
    var exists = data.includes(url);
    callback(exists);
  })
};

exports.addUrlToList = function(url, callback) {
  fs.writeFile(this.paths.list, url + '\n', "utf-8", function(err) {
    if (err) {
      throw err;
    } else {
      callback();
    }
  })
};

exports.isUrlArchived = function(url, callback) {
  fs.exists(this.paths.archivedSites + '/' + url, function(exists) {
    callback(exists);
  })
};

exports.downloadUrls = function(urls) {
  var that = this;
  urls.forEach(function(url) {
    http.get('http://' + url, function(response) {
      let rawData = '';
      response.on('data', (chunk) => {
        rawData+= chunk;
      }).on('end', () => {
        fs.writeFile(that.paths.archivedSites + '/' + url, rawData, "utf-8", function(error) {
          console.log(error);
        })
      })
    });
  });
};

exports.getHTML = function(url, callback) {
  fs.readFile(this.paths.archivedSites + url, "utf-8", function(error, data) {
    if(error) {
      console.log(error);
    } else {
      callback(data);
    }
  })
}
