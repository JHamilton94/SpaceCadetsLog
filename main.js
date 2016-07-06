var express = require('express');
var fs = require('fs');
var app = express();
app.set('view engine', 'jade');
//db and post initialization
var db = require('./mongo.js');
var post;
var currentBlogPage = 0;

app.use(express.static('public'));

var pageDirectory = '/pages';
var publicDirectory = '/public';
var imageDirectory = '/images'

var server = app.listen(8080, function(){
  var host = server.address().address
  var port = server.address().port

  console.log("Server running and listening at: %s:%s", host, port);
})

app.get('/', function(req, res){
  res.render(__dirname + publicDirectory + pageDirectory + '/home.jade', {message: "asdf"});
  console.log("Request for home page");
})

app.get('/blog', function(req, res){
  //Page information
  currentBlogPage = parseInt(req.query.page);
  var olderPage = currentBlogPage + 1;
  var newerPage = currentBlogPage - 1;
 
  //gather posts to render
  

  //Send page assembled with posts
  res.render(__dirname + publicDirectory + pageDirectory + '/blog.jade', {olderLink: "/blog?page=" + olderPage, newerLink: "/blog?page=" + newerPage});
  console.log("Request for blog page: " + currentBlogPage);
})

app.get('/games', function(req, res){
  res.render(__dirname + publicDirectory + pageDirectory + '/games.jade');
  console.log("Request for games page");
})

app.get('/contact', function(req, res){
  res.render(__dirname + publicDirectory + pageDirectory + '/contact.jade');
  console.log("Request for contact page");
})

