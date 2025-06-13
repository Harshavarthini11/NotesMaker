import React from "react";
import { useSelector } from "react-redux";

import Note from "./Note";

const Notes = () => {
	const notes = useSelector((state) => state.notes.notes);

	return (
		<div>
			<h2 className="mb-4 text-2xl font-bold">Notes:</h2>
			<div className="grid grid-cols-1 gap-4">
				{notes &&
					notes.map((note, index) => {
						return <Note note={note} key={index} />;
					})}
			</div>
		</div>
	);
};

export default Notes;
