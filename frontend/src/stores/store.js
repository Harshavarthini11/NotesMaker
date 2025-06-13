import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authReducer";
import notesReducer from "./notesReducer";

export const store = configureStore({
	reducer: {
		notes: notesReducer,
		auth: authReducer,
	},
	devTools: true,
});
