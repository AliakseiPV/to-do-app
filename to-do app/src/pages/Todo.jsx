import React from 'react'
import { Link } from 'react-router-dom'
import { LIST_ROUTE } from "../router/consts"
import { CreateList } from '../components'
import { useGetListsQuery, useDeleteListMutation } from '../store/api/list.api'

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
		<div>
			<CreateList />

			<ul>
				{isSuccess && lists.map(list => (
					<li key={list.id}>
						<Link to={LIST_ROUTE + `/${list.id}`}>
							{list.name}
						</Link>
						<button onClick={() => removeList(list.id)}>
							Delete list
						</button>
					</li>
				))}
			</ul>

		</div>
	)
}

export default Todo