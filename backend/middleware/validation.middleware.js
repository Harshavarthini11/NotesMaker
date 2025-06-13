const { body, validationResult } = require("express-validator");

// Define validation rules for signup route
const signupValidationRules = () => {
	return [
		body("email").isEmail().withMessage("Please provide a valid email address"),
		body("password").notEmpty().withMessage("Password cannot be empty"),
	];
};

// Define validation rules for login route
const loginValidationRules = () => {
	return [
		body("email").isEmail().withMessage("Please provide a valid email address"),
		body("password").notEmpty().withMessage("Password cannot be empty"),
	];
};

// Extract validation errors from the request, Construct error object and pass it to the error handling middleware if validation errors are present, Continue on
const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = Object.assign(new Error("Validation failed"), {
			statusCode: 400,
			data: errors.array(),
		});
		return next(error);
	}
	next();
};

module.exports = {
	signupValidationRules,
	loginValidationRules,
	validate,
};
