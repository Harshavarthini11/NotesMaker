import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/notes.png";

export const NavBar = () => {
	const user = useSelector((state) => state.auth.user);
	const loadingCheckAuth = useSelector((state) => state.auth.loadingCheckAuth);
	const loadingLogout = useSelector((state) => state.auth.loadingLogout);

	if (loadingCheckAuth || loadingLogout) {
		return null; // or loading indicator
	}

	return (
		<nav className="p-4 text-white bg-gray-800">
			<div className="flex items-center justify-between max-w-4xl mx-auto">
				<Link to="/" className="flex items-center">
					<img src={logo} alt="Logo" className="h-8 mr-2" />
					<span className="font-bold">Notes App</span>
				</Link>
				<ul className="flex items-center space-x-4">
					{user ? (
						<>
							<p className="px-3 py-2">{user}</p>

							<li>
								<Link
									to="/logout"
									className="px-3 py-2 rounded hover:bg-gray-700"
								>
									Logout
								</Link>
							</li>
						</>
					) : (
						<>
							<li>
								<Link
									to="/login"
									className="px-3 py-2 rounded hover:bg-gray-700"
								>
									Login
								</Link>
							</li>
							<li>
								<Link
									to="/signup"
									className="px-3 py-2 rounded hover:bg-gray-700"
								>
									Signup
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
};
