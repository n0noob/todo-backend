const router = require('express').Router();
      mongoose = require('mongoose');

const TodoItem = mongoose.model('TodoItem');


router.get('/:id', (req, res, next) => {
  console.log('Got the request ' + req.params.id);
  TodoItem.findById(req.params.id).then((todoItem) => {
    if(!todoItem)
      res.sendStatus(404);
    return res.json({todoItem: todoItem});
  }).catch(next);
});

router.get('/', (req, res, next) => {
  console.log('Get all');
  TodoItem.find({}, (err, itemList) => {
    if(err)
      res.sendStatus(404);
    res.json(itemList);
  }).catch(next);
});

router.post('/', (req, res, next) => {
  let todoItem = new TodoItem();

  console.log(JSON.stringify(req.body));

  todoItem.done = req.body.done === 'true' ? true: false;
  todoItem.desc = req.body.desc;

  todoItem.save().then(() => {
    return res.json({todoItem: todoItem});
  }).catch(next);
});

router.delete('/:id', (req, res, next) => {
  console.log('Got the request ' + req.params.id);

  TodoItem.findByIdAndRemove(req.params.id, (err, todoItem) => {
    if(err)
      return next(err);
    return res.status(204).send(`Deleted record with id : ${req.params.id}`);
  });
});


module.exports = router;