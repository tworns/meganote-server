require('dotenv').load(); //requires environment variables
var express = require('express');
var db = require('mongoose');
var app = express();

db.connect();
app.listen('3030', function(){console.log('listening on http localhost port 3030');});
var note = db.model('Note', {title:String});
app.get('/',function(req,res){
  Note.find().then(function(notes){
    res.json(notes);
  });

});
