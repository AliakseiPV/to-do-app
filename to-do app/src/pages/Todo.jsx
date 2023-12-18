import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, LIST_ROUTE } from "../router/consts"
import { useActions } from '../hooks/useActions'
import { CreateList } from '../components'
import { useGetListsQuery, useDeleteListMutation } from '../store/api/todo.api'


const Todo = () => {

	const navigate = useNavigate()

	const { isLoading, data: lists, isSuccess } = useGetListsQuery()
	const { isAuth } = useActions()
	const [deleteList] = useDeleteListMutation()


	function logout() {
		try {
			localStorage.removeItem('jwt')
			isAuth(false)
			navigate(LOGIN_ROUTE)
		} catch (error) {
			console.error(error)
		}
	}

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
			<button onClick={logout}>Logout</button>

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