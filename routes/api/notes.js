const express = require('express');
const router = express.Router();
const notesCtrl = require('../../controllers/api/notes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', ensureLoggedIn, notesCtrl.create); // Create a new note
router.get('/', ensureLoggedIn, notesCtrl.getAll); // Get all notes for the user
router.delete('/:id', ensureLoggedIn, notesCtrl.delete); // Delete a note by ID
router.put('/:id', ensureLoggedIn, notesCtrl.update); // Update note by ID

module.exports = router;
