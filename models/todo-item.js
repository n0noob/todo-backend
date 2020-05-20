const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
  done: {type: Boolean, required: true},
  desc: {type: String, required: true}
});

mongoose.model('TodoItem', todoItemSchema);
