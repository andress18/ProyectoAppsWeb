const express = require('express');
const app = express();
const port = process.env.PORT || 9000;
const cors = require('cors')
const quotesRouter = require('./routes/quotes');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({message: 'Backend working'});
});

app.use('/quotes', quotesRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
