const router = require('express').Router();

router.use('/todo-item', require('./todos'));
router.use('/todo-item-sequence', require('./todo-item-sequence'));


router.use((err, req, res, next) => {
  console.log('Error : ' + err.stack);
  let errorCode = err.status || 500;
  res.sendStatus(errorCode);
})

module.exports = router;