var db = require('../config/db');
var NoteSchema = db.Schema({
  title:String,
  body_html:String,
  body_text:String,
  updated_at:{type:date,default:Date.now}
});
module.exports = Note;
