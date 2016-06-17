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
  //allow JSON
  res.header('Access-Control-Allow-Headers','Content-Type');
  //Allow the rest of the http verbs
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  //continue request processing
  next();
});
app.use(bodyParser.json());

var Note = db.model('Note', {title:String});
app.get('/',function(req,res){
  Note.find({}, {title:'1'})
  .sort({updated_at: -1}) //Sort descending, 'desc' also works
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
  //Create a note
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
  //update a note
  app.put('/:id',function(req,res){
    Note.findOne(
      {_id: req.params.id}
    ).then(function(note){
        note.title = req.body.note.title;
        note.body_html = req.body.note.title;
        note.save()
        .then(function(){
          res.json({
            message: 'Changes have been saved',
            note:note
          });
        });
    });
  });
