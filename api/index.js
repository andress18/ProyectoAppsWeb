const express = require('express');
const app = express();
const port = process.env.PORT || 9000;
const cors = require('cors')
const tareasRouter = require('./routes/tareas');
const usersRouter = require('./routes/users');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({message: 'Backend working'});
});

app.use('/users', usersRouter);
app.use('/tareas', tareasRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
