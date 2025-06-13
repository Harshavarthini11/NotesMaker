const Note = require("../models/note.model.js");
const { errorHandler } = require("../middleware/error.middleware");

/* [GET] View All Notes */
// Find the notes, Respond with them
const getAllNotes = async (req, res, next) => {
	try {
		const notes = await Note.find({ user: req.user._id });
		res.json({ notes });
	} catch (error) {
		next(error);
	}
};

/* [GET] View a specific Note by its ID */
// Get id from the url, Find the note using that id, Respond with the note
const getNoteById = async (req, res, next) => {
	const noteId = req.params.id;
	try {
		const note = await Note.findOne({ _id: noteId, user: req.user._id });
		if (!note) {
			next(Object.assign(new Error("Note not found"), { statusCode: 404 }));
		}
		res.json({ note });
	} catch (error) {
		next(error);
	}
};

/* [POST] Create a Note */
// Get the sent in data from the request body, Create a note with it, Respond with the new note
const createNote = async (req, res, next) => {
	const { title, description } = req.body;
	try {
		const note = await Note.create({ title, description, user: req.user._id });
		res.status(201).send({ note });
	} catch (error) {
		next(error);
	}
};

/* [PUT] Update a specific Note by its ID */
// Get the id from the url, Get the data from the request body, Find and update the record, Respond with updated record
const updateNoteById = async (req, res, next) => {
	const noteId = req.params.id;
	const { title, description } = req.body;

	try {
		const note = await Note.findOneAndUpdate(
			{ _id: noteId, user: req.user._id },
			{ title, description },
			{ new: true }
		);
		if (!note) {
			next(Object.assign(new Error("Note not found"), { statusCode: 404 }));
		}
		res.json({ note });
	} catch (error) {
		next(error);
	}
};

/* [DELETE] Remove a specific Note by its ID */
// Get id from url, Delete the record, Respond
const deleteNoteById = async (req, res, next) => {
	const noteId = req.params.id;
	try {
		const doesNoteExist = await Note.exists({
			_id: noteId,
			user: req.user._id,
		});
		if (doesNoteExist) {
			await Note.findByIdAndDelete({ _id: noteId, user: req.user._id });
			res.json({ success: "Record deleted" });
		} else {
			next(Object.assign(new Error("Note not found"), { statusCode: 404 }));
		}
	} catch (error) {
		next(error);
	}
};

const noteController = {
	getAllNotes,
	getNoteById,
	createNote,
	updateNoteById,
	deleteNoteById,
};

module.exports = noteController;
