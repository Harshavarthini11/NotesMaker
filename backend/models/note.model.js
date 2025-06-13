const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			// unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // many-to-one
	},
	{
		versionKey: false, // Disable the __v field that Mongoose adds to schemas to manage internal versioning
	}
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
