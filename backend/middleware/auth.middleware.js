const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Read token off cookies, Decode the token, Check expiration, Find user using decoded sub, Attach user to req, Continue on
const requireAuth = async (req, res, next) => {
	try {
		const token = req.cookies.Authorization;
		if (!token) throw new Error("No token provided.");

		const decoded = jwt.verify(token, process.env.SECRET);
		if (Date.now() > decoded.exp) throw new Error("Token has expired.");

		const user = await User.findById(decoded.sub);
		if (!user) throw new Error("User not found.");

		req.user = user;
		next();
	} catch (err) {
		next(Object.assign(err, { statusCode: 401 }));
	}
};

module.exports = { requireAuth };
