import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteNote, setUpdateForm } from "../stores/notesReducer";

const Note = ({ note }) => {
	const dispatch = useDispatch();

	const handleDeleteNote = async (id) => {
		await axios.delete(`/api/notes/${id}`);
		dispatch(deleteNote(id));
	};

	const toggleUpdate = (note) => {
		const { _id, title, description } = note;
		dispatch(
			setUpdateForm({
				_id,
				title,
				description,
			})
		);
	};

	return (
		<div key={note._id} className="p-4 bg-white rounded shadow-md">
			<h3 className="mb-2 text-lg font-bold">{note.title}</h3>
			<p className="text-gray-700">{note.description}</p>
			<div className="flex mt-4 space-x-2">
				<button
					className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
					onClick={() => handleDeleteNote(note._id)}
				>
					Delete note
				</button>
				<button
					className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
					onClick={() => toggleUpdate(note)}
				>
					Update note
				</button>
			</div>
		</div>
	);
};

export default Note;
