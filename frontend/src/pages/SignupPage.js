import React from "react";
import { SignupForm } from "../components/SignupForm";

export const SignupPage = () => {
	return (
		<div className="flex flex-col items-center justify-center bg-gray-100 h-screen-minus-navbar">
			<h1 className="mb-8 text-3xl font-bold">Sign up</h1>
			<SignupForm />
		</div>
	);
};
