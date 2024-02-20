import React from 'react'
import { Task, CreateTask, Modal, NavBar } from '../components'
import { useGetTasksQuery } from '../store/api/task.api'
import { useDeleteListMutation, useUpdateListMutation } from '../store/api/list.api'
import { useNavigate } from 'react-router-dom'
import { TODO_ROUTE } from '../router/consts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


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
		<div className="flex flex-col items-center justify-center mx-auto h-screen bg-bgwhite">
			<div className=" relative w-[500px] h-[650px] flex flex-col shadow-lg shadow-purple1 p-10 rounded-lg bg-white">
				<NavBar />
				

				<div className='flex justify-center mx-10 my-10 relative'>
					<h2 className='text-3xl font-bold text-gray-500 text-center'>
						{listName}
					</h2>
					<Modal clickHandler={changeListName} listId={listId} listName={listName} />
				</div>
				

				<CreateTask listId={listId} />

				<div className='overflow-auto my-2'>
					{isSuccess && tasks.map(item => (
						<Task
							taskName={item.task}
							isComplete={item.isComplete}
							taskId={item.id}
							key={item.id}
						/>
					))}
				</div>

				<button
					onClick={removeList}
					className='absolute bottom-5 right-10 text-lg text-[#ff7d7d]'
				>
					<FontAwesomeIcon icon={faTrash} size="lg" />
				</button>
			</div>
		</div>
	)
}

export default TaskList