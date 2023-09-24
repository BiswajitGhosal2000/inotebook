const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');


//Route 1: Add a new note using: POST "/api/note/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', "title should be minimum 3 characters long").isLength({ min: 3 }),
    body('description', "description should be minimum 5 characters long").isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const note = await Note.create({ title: req.body.title, description: req.body.description, tag: req.body.tag, user: req.user })
        // console.log(note)
        res.json({
            note
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Route 2: Fetch all the note using: GET "/api/note/fetchallnote". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    // console.log(req.user)
    const notes = await Note.find({ user: req.user });
    res.json({ notes: notes });
});

//Route 3: Fetch particular note by id using: GET "/api/note/fetchnote". Login required
router.get('/fetchnote/:id', fetchuser, async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }
    //Allow fetching only if user owns this Note
    if (note.user.toString() !== req.user) {
        return res.status(401).send("Not Allowed");
    }
    res.json({ note });
});

//Route 4: Update an existing note using: PUT "/api/note/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };
    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }
    if (note.user.toString() !== req.user) {
        return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note });
});

//Route 5: Delete an existing note using: DELETE "/api/note/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    //Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }
    //Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user) {
        return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ "Success": "Note has been deleted", note: note });
});

module.exports = router;