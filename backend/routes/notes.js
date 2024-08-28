const express = require('express');
const Note = require('../models/Note');
const fetchUser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const router = express.Router();


// ROUTE 1: Fetch all users using GET "/api/notes/fetchallnotes"
// Login Require
router.get('/fetchallnotes', fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({user: req.user.id});
    res.json(notes);
  } catch(err) {
    console.log(err);
    res.status(400).json({ error: 'Internal Server Error' });
  }
})

// ROUTE 2: Adding a new note using POST "/api/notes/addnote"
// Login Require
router.post('/addnote', [
  body('title', 'Enter a valid title'),
  body('description', 'Enter a valid description'),
], fetchUser, async (req, res) => {

  try {

    const {title, description, tag} = req.body;
  
    // Returns a bad request in case of an error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new Note({
      title, description, tag, user: req.user.id
    })

    const savedNote = await note.save();
    res.json(savedNote);

  } catch(err) {
    console.log(err);
    res.status(400).json({error: 'Internal Server Error'});
  }

});


// ROUTE 3: Updating an existing note using PUT "/api/notes/updatenote"
// Login Require
router.put('/updatenote/:id', fetchUser, async (req, res) => {
  
  const {title, description, tag} = req.body;

  try {
    
    // Creating a newNote object
    const newNote = {};
    if (title) {newNote.title = title};
    if (description) {newNote.description = description};
    if (tag) {newNote.tag = tag};

    // Finding the note that is to be updated. And Updating that note.
    let note = await Note.findById(req.params.id);
    if (!note) {res.status(404).send("Not Found")};

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Access Denied");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});

    res.json({note});

  } catch(err) {
    console.log(err);
    res.status(400).json({error: 'Internal Server Error'});
  }

})


// ROUTE 4: Delete an existing note using DELETE "/api/notes/deletenote"
// Login Require
router.delete('/deletenote/:id', fetchUser, async (req, res) => {

  try {
   
    // Finding the note that is to be deleted. And deleting that note.
    let note = await Note.findById(req.params.id);
    if (!note) {res.status(404).send("Not Found")};

    // Allowing deletion only if the user owns the note.
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Access Denied");
    }

    note = await Note.findByIdAndDelete(req.params.id);

    res.json({"Success": "Note has been deleted", note: note});

  } catch(err) {
    console.log(err);
    res.status(400).json({error: 'Internal Server Error'});
  }

})


module.exports = router;

