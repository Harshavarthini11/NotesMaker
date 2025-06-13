// Load environment variables
require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

// Connecting to the DB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("Connected to database");

		// Starting the server
		const PORT = process.env.PORT || 3001;
		app.listen(process.env.PORT, () => {
			console.log(`Server is listening on port ${PORT}...`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
