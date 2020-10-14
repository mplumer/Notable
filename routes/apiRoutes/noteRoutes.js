const router = require("express").Router();
const { createNewNote, validateNote, } = require("../../lib/notes");
const { notes } = require("../../data/notes");

router.get('/notes', (req, res) => {
    res.json(notes);
});

/*app.post('/api/notes', (req, res) => {
    // req.body is where our incoming content will be
    console.log(req.body);
    res.json(req.body);
}); */

router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    //req.body.id = notes.length.toString();*/

    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

module.exports = router;
