import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	loginForm: {
		email: "",
		password: "",
	},
	signupForm: {
		email: "",
		password: "",
	},
	user: null,
	// loggedIn: null,
	loadingCheckAuth: false,
	errorCheckAuth: null,
	loadingLogin: false,
	errorLogin: null,
	loadingLogout: false,
	errorLogout: null,
};

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
	const res = await axios.get("/api/auth/check-auth");
	return res.data.email;
});

export const login = createAsyncThunk("auth/login", async (loginForm) => {
	const res = await axios.post("/api/auth/login", loginForm);
	// Logic for storing user email after successful login
	localStorage.setItem("user", res.data.email);

	return res.data.email;
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
	await axios.get("/api/auth/logout");
	localStorage.removeItem("user");
});

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLoginForm: (state, action) => {
			state.loginForm = action.payload;
		},
		resetLoginForm: (state) => {
			state.loginForm = initialState.loginForm;
		},
		// setLoggedIn: (state, action) => {
		// 	state.loggedIn = action.payload;
		// },
		setSignupForm: (state, action) => {
			state.signupForm = action.payload;
		},
		resetSignupForm: (state, action) => {
			state.signupForm = initialState.signupForm;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(checkAuth.pending, (state) => {
				state.loadingCheckAuth = true;
				state.errorCheckAuth = null;
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.loadingCheckAuth = false;
				// state.loggedIn = true;
				state.user = action.payload;
			})
			.addCase(checkAuth.rejected, (state, action) => {
				state.loadingCheckAuth = false;
				// state.loggedIn = false;
				state.user = null;
				state.errorCheckAuth = action.error.message;
			})
			.addCase(login.pending, (state) => {
				state.loadingLogin = true;
				state.errorLogin = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loadingLogin = false;
				// state.loggedIn = true;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.loadingLogin = false;
				// state.loggedIn = false;
				state.user = null;
				state.errorLogin = action.error.message;
			})
			.addCase(logoutUser.pending, (state) => {
				state.loadingLogout = true;
				state.errorLogout = null;
			})
			.addCase(logoutUser.fulfilled, (state, action) => {
				state.loadingLogout = false;
				// state.loggedIn = false;
				state.user = null;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loadingLogout = false;
				// state.loggedIn = false;
				state.errorLogout = action.error.message;
			});
	},
});

export const {
	setLoginForm,
	resetLoginForm,
	setLoggedIn,
	setSignupForm,
	resetSignupForm,
	setUser,
} = authSlice.actions;

export default authSlice.reducer;
