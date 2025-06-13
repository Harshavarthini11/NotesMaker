// Log the error, Determine the status code, Include additional error data if present, Construct the response, Respond with the error
// Note: There is no call to next() here because this middleware is intended to end the response cycle when an error occurs
const errorHandler = async (err, req, res, next) => {
	console.error(err);
	const statusCode = err.statusCode || 500;
	const details = err.data ? { details: err.data } : {};
	const response = {
		error: {
			message: err.message || "An unexpected error occurred.",
			...details,
		},
	};
	res.status(statusCode).json(response);
};

module.exports = { errorHandler };
