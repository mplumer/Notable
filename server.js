const fs = require('fs');
const path = require('path');
const { notes } = require('./data/db.json');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());









function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './data/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}








app.get('/api/notes', (req, res) => {
    res.json(notes);
});

/*app.post('/api/notes', (req, res) => {
    // req.body is where our incoming content will be
    console.log(req.body);
    res.json(req.body);
}); */

app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    //req.body.id = notes.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validatenote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewnote(req.body, notes);
        res.json(note);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});