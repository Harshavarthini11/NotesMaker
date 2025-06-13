const express = require("express");
const noteController = require("../controllers/note.controller");
const { requireAuth } = require("../middleware/auth.middleware"); // Route-Specific Middleware

const router = express.Router();

// NOTE ROUTES
router.get("/", requireAuth, noteController.getAllNotes);
router.get("/:id", requireAuth, noteController.getNoteById);
router.post("/", requireAuth, noteController.createNote);
router.put("/:id", requireAuth, noteController.updateNoteById);
router.delete("/:id", requireAuth, noteController.deleteNoteById);

module.exports = router;
