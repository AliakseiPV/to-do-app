import React from 'react'

const Task = ({ taskName }) => {
	return (
		<div>
			<p>{taskName}</p>
			<input type="checkbox" />
			<span>date</span>
			<button>fix</button>
		</div>
	)
}

export default Task