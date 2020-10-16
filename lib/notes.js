const fs = require("fs");
const path = require("path");



function filterByQuery(query, notes) {
    let filteredResults = notes;
    if (query.title) {
        filteredResults = filteredResults.filter(
            (note) => note.title === query.title
        );
    }
    return filteredResults;
}

function findById(id, notes) {
    const result = notes.filter((note) => note.id === id)[0];
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirtitle, '../data/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== "string") {
        return false;
    }
    return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote
};