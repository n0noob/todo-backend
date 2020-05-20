module.exports = {
  PORT: 5001,
  DBURL: process.env.ENVIRONMENT === 'prod' ? '' : 'mongodb://localhost:27017/testdb1'
}