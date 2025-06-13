const winston = require("winston");
const { combine, timestamp, printf, colorize } = winston.format;

// Custom colorization for log levels
const customColorize = colorize({
	all: true,
	colors: { info: "blue", error: "red", warn: "yellow", debug: "green" },
});

// Custom log format
const myFormat = printf(({ level, message, timestamp }) => {
	return `${customColorize.colorize(
		level,
		`[${timestamp}] ${level.toUpperCase()}:`
	)} ${message}`;
});

// Create a Winston logger instance
const logger = winston.createLogger({
	level: "info",
	format: combine(timestamp({ format: "YY-MM-DD E HH:mm:ss.SSS" }), myFormat),
	transports: [new winston.transports.Console()],
});

// Middleware to log HTTP requests
const requestLogger = (req, res, next) => {
	const { method, url } = req;
	const logMessage = `${method} ${url}`;
	logger.info(logMessage);
	next();
};

module.exports = { logger, requestLogger };
