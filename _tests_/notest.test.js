const fs = require("fs");
const { createNewNote, validateNote, } = require("../lib/notes");
const { notes } = require("../data/db.json");

test("creates an note object", () => {
    const note = createNewnote(notes);

    expect(note).toHaveProperty();
    
});
