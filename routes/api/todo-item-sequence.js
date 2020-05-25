const router = require('express').Router();
      mongoose = require('mongoose');
      _ = require('lodash');

const TodoItemSequence = mongoose.model('TodoItemSequence');

router.get('/', (req, res, next) => {
  TodoItemSequence.find({}, (err, todoSequence) => {
    if(err)
      next(err);
    
    if(todoSequence.length == 0)
      res.sendStatus(200);
    
    if(todoSequence.length > 1){
      console.error('More than one todo sequences exists');
      res.sendStatus(500);
    }

    console.log(todoSequence[0].sequence);
    todoSequenceObj = JSON.parse(todoSequence[0].sequence);
    return res.json({"todoItemSequence": todoSequenceObj});
  })
});

router.put('/', (req, res, next) => {

  //Validation
  if(req.body.todoItemSequence == undefined)
    throw new Error('Could not find todoItemSequence in body of the request')

  
  console.log('Todo item sequence : ' + JSON.stringify(req.body.todoItemSequence));

  let todoItemSequence = new TodoItemSequence();
  todoItemSequence.sequence = JSON.stringify(req.body.todoItemSequence);

  //Flush the table
  TodoItemSequence.deleteMany({}, (err) => {
    if(err)
      next(err);
  });

  //Save the new sequence
  todoItemSequence.save((err) => {
    if(err)
      next(err);
  });

  res.sendStatus(200);
})

module.exports = router;