import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	resetUpdateForm,
	setUpdateForm,
	updateNote,
} from "../stores/notesReducer";

const UpdateForm = () => {
	const updateForm = useSelector((state) => state.notes.updateForm);
	const dispatch = useDispatch();

	const handleUpdateFieldChange = (e) => {
		const { name, value } = e.target;
		dispatch(
			setUpdateForm({
				...updateForm,
				[name]: value,
			})
		);
	};

	const handleUpdateNote = async (e) => {
		e.preventDefault();
		const { title, description } = updateForm;
		const res = await axios.put(`/api/notes/${updateForm._id}`, {
			title,
			description,
		});
		console.log(res);
		dispatch(updateNote(updateForm));
		dispatch(resetUpdateForm());
	};

	return (
		<div>
			{updateForm._id && (
				<div className="p-4 bg-white rounded shadow-md">
					<h2 className="mb-4 text-lg font-bold">Update note</h2>
					<form onSubmit={handleUpdateNote}>
						<input
							className="w-full px-3 py-2 mb-4 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
							onChange={handleUpdateFieldChange}
							value={updateForm.title}
							name="title"
						/>
						<textarea
							className="w-full px-3 py-2 mb-4 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
							onChange={handleUpdateFieldChange}
							value={updateForm.description}
							name="description"
						/>
						<button
							type="submit"
							className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
						>
							Update note
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default UpdateForm;
