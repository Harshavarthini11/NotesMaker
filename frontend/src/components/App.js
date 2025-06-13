import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { LogoutPage } from "../pages/LogoutPage";
import NotesPage from "../pages/NotesPage";
import { SignupPage } from "../pages/SignupPage";
import AuthRoute from "./AuthRoute";
import { NavBar } from "./NavBar";
import ProtectedRoute from "./ProtectedRoute";

function App() {
	return (
		<div>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<NotesPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/login"
						element={
							<AuthRoute>
								<LoginPage />
							</AuthRoute>
						}
					/>
					<Route
						path="/signup"
						element={
							<AuthRoute>
								<SignupPage />
							</AuthRoute>
						}
					/>
					<Route
						path="/logout"
						element={
							<ProtectedRoute>
								<LogoutPage />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
