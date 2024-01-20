import React from 'react'
import { Link } from 'react-router-dom'
import { LIST_ROUTE } from "../router/consts"
import { CreateList, NavBar } from '../components'
import { useGetListsQuery, useDeleteListMutation } from '../store/api/list.api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const Todo = () => {

	const { isLoading, data: lists, isSuccess } = useGetListsQuery()
	const [deleteList] = useDeleteListMutation()

	const removeList = async (id) => {
		try {
			await deleteList(id)
		} catch (error) {
			console.error(error.message);
		}
	}

	if (isLoading) {
		return <div>Here should be spinner</div>
	}

	return (
		<div className="flex flex-col items-center justify-center mx-auto h-screen bg-bgwhite">
			<div className="w-[500px] h-[650px] flex flex-col shadow-lg shadow-purple1 p-10 rounded-lg bg-white">
				<NavBar />
				<h1 className='text-3xl font-bold text-gray-500 text-center mx-14 my-14'>
					Task
					<span className='text-lightblue ml-2'>List</span>
				</h1>
				<CreateList />
				<ul className='overflow-auto'>
					{isSuccess && lists.map(list => (
						<li
							key={list.id}
							className='mb-5 border-2 border-lightpurple p-3 rounded-lg flex justify-between text-babyblue text-lg font-semibold'
						>
							<Link className=' w-full' to={LIST_ROUTE + `/${list.id}`}>
								{list.name}
							</Link>
							<button
								onClick={() => removeList(list.id)}
								className='ml-4'
							>
								<FontAwesomeIcon icon={faXmark} size="lg" style={{ color: "#ff7d7d", }} />
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Todo