// AuthRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
	// const user = useSelector((state) => state.auth.user);
	const userLocal = localStorage.getItem("user");
	console.log(userLocal);

	if (userLocal) {
		// Redirect them to the home page if they are already logged in
		return <Navigate to="/" replace />;
	}

	return children;
};

export default AuthRoute;
