const mongoose = require('mongoose');
      _=require('lodash');

const todoItemSequence = new mongoose.Schema({
  sequence: {
    type: String,
    required: [true, 'Todo item sequence is mandatory']
    //required: [true, 'Todo Item ID is mandatory']
  }
});


mongoose.model('TodoItemSequence', todoItemSequence);