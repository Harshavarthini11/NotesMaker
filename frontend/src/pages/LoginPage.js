import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
	return (
		<div className="flex flex-col items-center justify-center bg-gray-100 h-screen-minus-navbar">
			<h1 className="mb-8 text-3xl font-bold">Login</h1>
			<LoginForm />
		</div>
	);
};

export default LoginPage;
