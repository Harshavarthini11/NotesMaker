import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	// const user = useSelector((state) => state.auth.user);
	const userLocal = localStorage.getItem("user");

	if (!userLocal) {
		// Redirect them to the /login page if they are not logged in
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default ProtectedRoute;
