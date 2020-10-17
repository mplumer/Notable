const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const {
    filterByQuery,
    createNewNote,
    deleteNote,
    validateNote,
} = require("../../lib/notes");
const { notes } = require("../../data/notes.json");








router.get("/notes", (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});


router.post('/notes', (req, res) => {

    // set id based on what the highest id of the array will be
    const maxId = Math.max.apply(Math, notes.map(function (o) {
        return o.id;
    }));

    if (maxId > 0) {
        req.body.id = (maxId + 1).toString();
    } else {
        req.body.id = notes.length.toString();
    }

    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

router.delete("/notes/:id", (req, res) => {

    const id = req.params.id;
    const index = notes.findIndex(n => n.id === id);

    notes.splice(index, 1);

    res.json(id);
    fs.writeFileSync(
        path.join(__dirname, '../../data/notes.json'),
        JSON.stringify({
            notes: notes
        }, null, 2)
    );
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});


module.exports = router;
