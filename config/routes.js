//Web API
var express = require("express");

var scraper = require('../app/controllers/scraper');

module.exports = function (app) {
    
    //API GET
    app.get('/', scraper.scrape);
    
};
