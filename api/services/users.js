const db = require('./db');
const config = require('../config');

function getMultiple() {
  const data = db.query(`SELECT * FROM Users`,[]);
  return {data};
}


module.exports = {
  getMultiple,
}
