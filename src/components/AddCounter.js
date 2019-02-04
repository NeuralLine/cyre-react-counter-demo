import React from 'react';
import { cyre } from 'cyre';

const handleSubmit = (event) => {
	event.preventDefault();
	cyre.call('addCounter', event.target.counterInputID.value);
	event.target.counterInputID.value = '';
};

const AddCounter = () => (
	<form onSubmit={handleSubmit} className="form-inline">
		<input type="text" name="counterInputID" className="form-control" placeholder="New ID" />
		<button type="submit" className="btn btn-primary">
			Add
		</button>
	</form>
);

export default AddCounter;
