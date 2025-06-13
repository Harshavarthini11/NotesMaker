import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	loading: false,
	error: null,
	notes: [],
	createForm: {
		title: "",
		description: "",
	},
	updateForm: {
		_id: null,
		title: "",
		description: "",
	},
};

// Generates pending, fulfilled and rejected action types
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
	const res = await axios.get("/api/notes");
	return res.data.notes;
});

export const notesSlice = createSlice({
	name: "notes",
	initialState,
	reducers: {
		clearNotes: (state) => {
			state.notes = [];
		},
		setCreateForm: (state, action) => {
			state.createForm = action.payload;
		},
		resetCreateForm: (state) => {
			state.createForm = initialState.createForm;
		},
		setUpdateForm: (state, action) => {
			state.updateForm = action.payload;
		},
		resetUpdateForm: (state, action) => {
			state.updateForm = initialState.updateForm;
		},
		addNote: (state, action) => {
			state.notes.push(action.payload);
		},
		deleteNote: (state, action) => {
			state.notes = state.notes.filter((note) => note._id !== action.payload);
		},
		updateNote: (state, action) => {
			state.notes = state.notes.map((note) =>
				note._id === action.payload._id ? action.payload : note
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchNotes.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchNotes.fulfilled, (state, action) => {
				state.loading = false;
				state.notes = action.payload;
			})
			.addCase(fetchNotes.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const {
	clearNotes,
	setCreateForm,
	resetCreateForm,
	setUpdateForm,
	resetUpdateForm,
	addNote,
	deleteNote,
	updateNote,
} = notesSlice.actions;

export default notesSlice.reducer;
