var express = require('express');
var fs = require('fs');
var app = express();
app.set('view engine', 'jade');

//db and post initialization
var currentBlogPage = 0;
var mongoDB = require('mongodb');
var mongoClient = mongoDB.MongoClient;
var url = 'mongodb://localhost:27017/blog';

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
  //page
  if(req.query.page != null){
    //Determine page
    console.log("Queried for page: " + req.query.page);
    currentBlogPage = parseInt(req.query.page);
    var olderPage = currentBlogPage + 1;
    var newerPage = currentBlogPage - 1;
    
    //Find entries with tag
    if(req.query.tag != null){
         mongoClient.connect(url, function(err, db){
         var cursor = db.collection('posts').find({'tags': req.query.tag}).limit(100).toArray(function(err, results){ 
           
           
           res.render(__dirname + publicDirectory + pageDirectory + '/blog.jade', {olderLink: "/blog?page=" 
             + olderPage + "&tag=" + req.query.tag, newerLink: "/blog?page=" + newerPage + "&tag=" + req.query.tag, postContent: results});
           console.log("Request for blog page: " + currentBlogPage + " tag: " + req.query.tag);
         });
       });
    //Find entries with search
    }else if(req.query.search !=  null){
       searchTerm = '\.*'+req.query.search+'\.';
       mongoClient.connect(url, function(err, db){
         var cursor = db.collection('posts').find({'content': new RegExp(searchTerm, 'i')}).limit(100).toArray(function(err, results){ 
           res.render(__dirname + publicDirectory + pageDirectory + '/blog.jade', {olderLink: "/blog?page=" 
             + olderPage + "&search=" + req.query.search, newerLink: "/blog?page=" + newerPage + "&search=" + req.query.search, postContent: results});
           console.log("Request for blog page: " + currentBlogPage + " search: " + req.query.search);
         });
       });
    //Find chronological entries
    }else{
      mongoClient.connect(url, function(err, db){
        var cursor = db.collection('posts').find().limit(100).toArray(function(err, results){
          res.render(__dirname + publicDirectory + pageDirectory + '/blog.jade', {olderLink: "/blog?page=" + olderPage, newerLink: "/blog?page=" + newerPage, postContent: results});
          console.log("Request for blog page: " + currentBlogPage);
        });
      });
    }
  }
})

app.get('/games', function(req, res){
  res.render(__dirname + publicDirectory + pageDirectory + '/games.jade');
  console.log("Request for games page");
})

app.get('/contact', function(req, res){
  res.render(__dirname + publicDirectory + pageDirectory + '/contact.jade');
  console.log("Request for contact page");
})

