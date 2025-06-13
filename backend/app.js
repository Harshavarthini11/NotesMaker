// Import dependencies
const express = require("express");
const noteRoutes = require("./routes/note.route");
const userRoutes = require("./routes/user.route");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { requestLogger } = require("./middleware/logger.middleware");
const { errorHandler } = require("./middleware/error.middleware");

// Create an express app
const app = express();

// Configure express app (global middleware)
app.use(requestLogger); // Apply request logging middleware to log every request to the server
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

// This is the root route. It is used to check if the server is running.
app.get("/", (req, res) => {
	res.status(200).json({ alive: "true" });
});

// Routing
app.use("/api/notes", noteRoutes);
app.use("/api/auth", userRoutes);

// Apply centralized error handling middleware
app.use(errorHandler);

module.exports = app;
