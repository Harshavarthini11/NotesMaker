import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateForm from "../components/CreateForm";
import Notes from "../components/Notes";
import UpdateForm from "../components/UpdateForm";
import { checkAuth } from "../stores/authReducer";
import { fetchNotes } from "../stores/notesReducer";

const NotesPage = () => {
	const isLoadingNotes = useSelector((state) => state.notes.loading);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkAuth());
		dispatch(fetchNotes());
	}, [dispatch]);

	if (isLoadingNotes) {
		return <div>Loading Notes...</div>;
	}

	return (
		<div className="container px-4 py-8 mx-auto">
			<Notes />
			<UpdateForm />
			<CreateForm />
		</div>
	);
};

export default NotesPage;
