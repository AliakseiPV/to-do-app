import React from 'react'
import { useUpdateTaskMutation, useDeleteTaskMutation } from '../store/api/task.api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const Task = (params) => {
	const { taskName, taskId, isComplete } = params

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
		<div className='mb-5 border-2 border-lightpurple p-3 rounded-lg flex justify-between text-babyblue text-lg font-semibold'>
			<label className='cursor-pointer w-full mr-2 flex gap-3'>
				<input
					type="checkbox"
					defaultChecked={isComplete}
					onChange={checkComplete}
				/>
				{taskName}
			</label>
			<button onClick={removeTask}>
				<FontAwesomeIcon icon={faXmark} size="lg" style={{ color: "#ff7d7d", }} />
			</button>
		</div>
	)

}

export default Task