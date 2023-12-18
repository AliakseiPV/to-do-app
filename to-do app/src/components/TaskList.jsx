import React from 'react'
import { Task, CreateTask, Modal } from '../components'
import { useGetTasksQuery } from '../store/api/task.api'
import { useDeleteListMutation, useUpdateListMutation } from '../store/api/list.api'
import { useNavigate } from 'react-router-dom'
import { TODO_ROUTE } from '../router/consts'


const TaskList = (props) => {
	const { listName, listId } = props

	const navigate = useNavigate()

	const [deleteList] = useDeleteListMutation()
	const [updateList] = useUpdateListMutation()
	const { data: tasks, isSuccess } = useGetTasksQuery(listId)

	const removeList = async () => {
		try {
			await deleteList(listId)
			navigate(TODO_ROUTE)
		} catch (error) {
			console.error(error.message)
		}
	}

	const changeListName = async (id, defaultName, newName) => {
		try {
			if (newName !== defaultName) {
				await updateList({ id, name: newName })
			}
		} catch (error) {
			console.error(error.message)
		}
	}

	return (
		<div>
			<h2>{listName}</h2>
			<button onClick={removeList}>Delete</button>

			<Modal clickHandler={changeListName} listId={listId} listName={listName} />

			<CreateTask listId={listId} />

			{isSuccess && tasks.map(item => (
				<Task
					taskName={item.task}
					isComplete={item.isComplete}
					taskId={item.id}
					key={item.id}
				/>
			))}
		</div>
	)
}

export default TaskList