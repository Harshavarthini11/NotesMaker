import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addNote,
	resetCreateForm,
	setCreateForm,
} from "../stores/notesReducer";

const CreateForm = () => {
	const createForm = useSelector((state) => state.notes.createForm);
	const updateForm = useSelector((state) => state.notes.updateForm);
	const dispatch = useDispatch();

	const createNote = async (e) => {
		e.preventDefault();
		const res = await axios.post("/api/notes", createForm);
		dispatch(addNote(res.data.note));
		dispatch(resetCreateForm());
	};

	const updateCreateFormField = (e) => {
		const { name, value } = e.target;
		dispatch(
			setCreateForm({
				...createForm,
				[name]: value,
			})
		);
	};

	return (
		<div>
			{!updateForm._id && (
				<div className="p-4 bg-white rounded shadow-md">
					<h2 className="mb-4 text-lg font-bold">Create note</h2>
					<form onSubmit={createNote}>
						<input
							className="w-full px-3 py-2 mb-4 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
							onChange={updateCreateFormField}
							value={createForm.title}
							name="title"
						/>
						<textarea
							className="w-full px-3 py-2 mb-4 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
							onChange={updateCreateFormField}
							value={createForm.description}
							name="description"
						/>
						<button
							type="submit"
							className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
						>
							Create note
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default CreateForm;
