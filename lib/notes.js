const fs = require("fs");
const path = require("path");



function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.id) {
        filteredResults = filteredResults.filter(note => note.id === query.id);
    }

    return filteredResults;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../data/notes.json'),
        JSON.stringify({
            notes: notesArray
        }, null, 2)
    );
    // return finished code to post route for response
    return body;
};

function deleteNote(body, notesArray) {
    const note = body;
    notesArray.splice(note.id, 1);

    fs.writeFileSync(
        path.join(__dirname, '../data/notes.json'),
        JSON.stringify({
            notes: notesArray
        }, null, 2)
    );
    return notesArray;
};

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
};

module.exports = {
    filterByQuery,
    createNewNote,
    deleteNote,
    validateNote
};