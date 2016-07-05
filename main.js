var express = require('express');
var app = express();

//db and post initialization
var db = require('./mongo.js');
var post;


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
  res.sendFile(__dirname + publicDirectory + pageDirectory + '/home.html');
  console.log("Request for home page");
})

app.get('/blog', function(req, res){
  res.sendFile(__dirname + publicDirectory + pageDirectory + '/blog.html');
  console.log("Request for blog page");
  console.log("Page num: " + req.query.page);
})

app.get('/games', function(req, res){
  res.sendFile(__dirname + publicDirectory + pageDirectory + '/games.html');
  console.log("Request for games page");
})

app.get('/contact', function(req, res){
  res.sendFile(__dirname + publicDirectory + pageDirectory + '/contact.html');
  console.log("Request for contact page");
})

app.get('/image', function(req, res){
  res.sendFile(__dirname + publicDirectory + imageDirectory + '/mercury.jpg');
})


