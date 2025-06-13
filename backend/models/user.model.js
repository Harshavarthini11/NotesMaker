const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			index: true,
		},
		password: {
			type: String,
			required: true,
		},
		notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }], // one-to-many
	},
	{
		versionKey: false, // Disable the __v field that Mongoose adds to schemas to manage internal versioning
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
