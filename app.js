require('dotenv').load(); //requires environment variables
var express = require('express');
var app = express();
var db = require('./config/db');
var Note = require('./models/note');
app.listen('3030', function(){
  console.log('listening on http localhost port 3030');
});

var Note = db.model('Note', {title:String});
app.get('/',function(req,res){
  Note.find({}, {title:1})
  .then(function(notes){
    res.json(notes);
  });

});
