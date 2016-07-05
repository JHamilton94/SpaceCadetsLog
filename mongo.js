//The database
var mongoDB = require('mongodb');
    
//The client
var mongoClient = mongoDB.MongoClient;
    
//The URL
var url = 'mongodb://localhost:27017/blog_posts';
    
var exports = module.exports = {};
 

exports.num = 7;

exports.insertPost = function(){

 
  mongoClient.connect(url, function(err, db){
    if(err){
      console.log("Shits fucked yo: ", err);
    }else{
      console.log("Connection with database established at: ", url);
    }

    var collection = db.collection('posts');

    var post1 = {title: "script insert", content: "Script written content", date: new Date('2016-04-01'), tags: ['second', 'script'], by: "JROD"};

    collection.insert(post1, function(err, result){
      if(err){
        console.log("error inserting post1: " + err);
      } else {
        console.log("inserted post 1 successfully");
      }
      db.close();
    });
  });
}

