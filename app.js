var express = require('express');
var app = express();

app.listen('3030', function(){console.log('listening on http localhost port 3030');});
app.get('/',function(req,res){
  res.json([
    {title: 'hardcoded note', body_html: 'Cool kids make notes'},
    {title: 'also hard coded', body_html : 'Node does stuff'},
  ]);

});
