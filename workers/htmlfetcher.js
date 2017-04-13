// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var archive = require('../helpers/archive-helpers');
var crontab = require('node-crontab');

crontab.scheduleJob("*/1 * * * *", function(){
  archive.readListOfUrls(function(urlArray) {
    archive.downloadUrls(urlArray);
  })
});
