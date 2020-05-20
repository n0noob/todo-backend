const mongoose = require('mongoose');
      config = require('./index');

mongoose.connect(config.DBURL, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


//Event listener
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to : ' + config.DBURL);
})

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error : ' + err);
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
})


//Shutdown hooks
const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  })
})

//Models
//require('../models/locations')
require('../models/todo-item');