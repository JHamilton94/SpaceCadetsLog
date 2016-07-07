//The database
var mongoDB = require('mongodb');
    
//The client
var mongoClient = mongoDB.MongoClient;
    
//The URL
var url = 'mongodb://localhost:27017/blog';
    
var exports = module.exports = {};

exports.posts = [];
exports.num = 7;

//Returns a set number of posts
exports.getPosts = function(pageNum){ 

  mongoClient.connect(url, function(err, db){
    //establish connection
    if(err){
      console.log('error connecting to database ERROR: ' + err);
    }else{
      console.log('connected to db successfully');
    }
    
    var i = 0;

    var collection = db.collection('posts').find();    

    collection.each(function(err, doc){
      if(err){
        console.log('ERROR: ' + err);
      }else{
        console.log('Success I guess?');
      }

      if(doc != null){
        exports.posts.push(doc);
        i++;
      }else{
        db.close();
      }
    });

    for(var i = 0; i < 15; i++){
      console.log("Array: " + i + " " + exports.posts[i]);
    } 

    //var returnCollection = collection.find(); //.sort({date:1}).limit(100);
  });

  return exports.posts;  
}

exports.insertPost = function(){

  mongoClient.connect(url, function(err, db){
    if(err){
      console.log("Shits fucked yo: ", err);
    }else{
      console.log("Connection with database established at: ", url);
    }

    var collection = db.collection('posts');

    var arr = [];
    arr.length = 15;

    for(var i = 0; i < 15; i++){
      console.log("Loop: " + i);
      arr[i] = {title: "title #" + i, content: "Content #" + i, date: new Date('2016-04-' + i), tags: ['Cow' + i, 'Sheep' + i], by: 'author #' + i};
    }
    
    collection.insert(arr, function(err, result){
      if(err){
        console.log("error inserting post ERROR: " + err);
      } else {
        console.log("inserted post successfully");
      }
      db.close();
    });
  });
}

