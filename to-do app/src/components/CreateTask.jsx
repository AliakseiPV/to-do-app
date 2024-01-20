import React, { useState } from 'react'
import { useAddTaskMutation } from '../store/api/task.api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

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
		<form className='flex justify-center w-full'>

			<button
				onClick={createTask}
				type='submit'
			>
				<FontAwesomeIcon icon={faPlus} size="xl" style={{ color: "#BBD0FF", }} />
			</button>

			<input
				type="text"
				value={task.task}
				onChange={e => setTask({ ...task, task: e.target.value })}
				required
				placeholder='Create new task...'
				className="px-4 py-1.5 my-1 w-full focus:outline-none text-gray-500"
			/>


		</form>
	)
}

export default CreateTask