import React, { useState } from 'react'
import Task from './Task'
import { useAddTaskMutation, useGetTasksQuery } from '../store/api/todo.api'

const TaskList = (props) => {
	const {children, listName, listId } = props

	const initialData = {
		task: '',
		listId: listId,
		isComplete: false,
	}

	const [task, setTask] = useState(initialData)


	const [addTask] = useAddTaskMutation()
	const { data: tasks, isSuccess, refetch } = useGetTasksQuery(listId)

	const createTask = async (e) => {
		try {
			e.preventDefault()
			await addTask(task)
			setTask(initialData)
			await refetch()
		} catch (error) {
			console.error(error.message);
		}
	}



	return (
		<div>
			<h2>{listName}</h2>

			<form>
				<label>
					Enter your new task
					<input type="text" value={task.task} onChange={e => setTask({ ...task, task: e.target.value })} />
				</label>
				<button onClick={createTask} type='submit'>Add new task</button>
			</form>

			{isSuccess && tasks.map(item => (
				<Task taskName={item.task} key={item.id} />
			))}

		</div>
	)
}

export default TaskList