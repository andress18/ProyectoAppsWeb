const express = require('express');
const router = express.Router();
const users = require('../services/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  try {
    res.json(users.getMultiple());
  } catch(err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

module.exports = router;
