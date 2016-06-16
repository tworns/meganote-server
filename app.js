var express = require('express');
var app = express();

app.listen('3030', function(){console.log('listening on http localhost port 3030');});
app.get('/',function(req,res){
  res.send('I <3 pizza');

});
