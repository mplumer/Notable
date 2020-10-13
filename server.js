const { notes } = require('./data/db.json');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());


















app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    // req.body is where our incoming content will be
  console.log(req.body);
  res.json(req.body);
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});