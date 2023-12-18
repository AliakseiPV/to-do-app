import React, { useState } from 'react'
import { useAddTaskMutation } from '../store/api/task.api'

function CreateTask(props) {
	const { listId } = props

	const initialData = {
		task: '',
		listId: listId,
		isComplete: false,
	}
	const [task, setTask] = useState(initialData)
	const [addTask] = useAddTaskMutation()

	const createTask = async (e) => {
		try {
			e.preventDefault()
			await addTask(task)
			setTask(initialData)
		} catch (error) {
			console.error(error.message)
		}
	}

	return (
		<form>
			<label>
				Enter your new task
				<input
					type="text"
					value={task.task}
					onChange={e => setTask({ ...task, task: e.target.value })}
					required
				/>
			</label>
			<button onClick={createTask} type='submit'>Add new task</button>
		</form>
	)
}

export default CreateTask