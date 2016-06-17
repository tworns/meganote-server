require('dotenv').load(); //requires environment variables and loads them in
var express = require('express');
var app = express();
var db = require('./config/db');
var Note = require('./models/note');
var bodyParser = require('body-parser');

app.listen('3030', function(){
  console.log('listening on http localhost port 3030');
});

app.use(function(req,res,next){
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Headers','Content-Type');
  next();
});
app.use(bodyParser.json());

var Note = db.model('Note', {title:String});
app.get('/',function(req,res){
  Note.find({}, {title:'1'})
  .then(function(notes){
    res.json(notes);
  });
});
//READ ONE note
  app.get('/:id',function(req,res){
    Note.findOne({
      _id: req.params.id})
    .then(function(noteData){
      res.json(noteData);
    });
});

  app.post('/',function(req,res){
      var note = new Note({
        title: req.body.note.title,
        body_html: req.body.note.body_html
      });

      note.save()
      .then(function(noteData){
        res.json({
          message: 'successfully updated note',
          note:noteData
        });
      });
  });
