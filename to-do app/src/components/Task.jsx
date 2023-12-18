import React from 'react'
import { useUpdateTaskMutation, useDeleteTaskMutation } from '../store/api/todo.api'

const Task = (params) => {
	const { taskName, taskId, isComplete, listId } = params

	const [updateTask] = useUpdateTaskMutation()
	const [deleteTask] = useDeleteTaskMutation()

	const checkComplete = async (e) => {
		try {
			const { checked } = e.target
			await updateTask({ id: taskId, isComplete: checked })
		} catch (error) {
			console.error(error.message);
		}
	}

	const removeTask = async () => {
		try {
			await deleteTask(taskId)
		} catch (error) {
			console.error(error.message);
		}
	}

	return (
		<div>
			<p>{taskName}</p>
			<input
				type="checkbox"
				defaultChecked={isComplete}
				onChange={checkComplete}
			/>
			<button onClick={removeTask}>
				delete
			</button>
		</div>
	)

}

export default Task