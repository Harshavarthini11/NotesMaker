import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../stores/authReducer";
import { clearNotes } from "../stores/notesReducer";

export const LogoutPage = () => {
	const dispatch = useDispatch();
	const loadingLogout = useSelector((state) => state.auth.loadingLogout);

	useEffect(() => {
		dispatch(logoutUser());
		dispatch(clearNotes());
	}, [dispatch]);

	if (loadingLogout) {
		return <div className="mt-8 text-center">Logging out...</div>;
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen-minus-navbar">
			<h1 className="mb-4 text-3xl font-bold">You are now logged out</h1>
			<p className="text-lg">Thank you for using Notes App!</p>
		</div>
	);
};
