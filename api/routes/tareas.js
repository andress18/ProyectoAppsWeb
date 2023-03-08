const express = require('express');
const router = express.Router();
const tareas = require('../services/tareas');

/* GET tareas listing. */
router.get('/', function(req, res, next) {
  try {
    res.json(tareas.getTareas(req.query.page));
  } catch(err) {
    console.error(`Error while getting tareas `, err.message);
    next(err);
  }
});

/* POST tarea */
router.post('/', function(req, res, next) {
  try {
    res.json(tareas.create(req.body));
  } catch(err) {
    console.error(`Error while adding tareas `, err.message);
    next(err);
  }
});

/* put tarea */
router.put('/', function(req, res, next) {
  try {
    res.json(tareas.update(req.body));
  } catch(err) {
    console.error(`Error while adding tareas `, err.message);
    next(err);
  }
});

/* delete tarea */
router.post('/delete', function(req, res, next) {
  try {
    res.json(tareas.deleteTask(req.body));
  } catch(err) {
    console.error(`Error while adding tareas `, err.message);
    next(err);
  }
});

module.exports = router;
