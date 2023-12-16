import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, LIST_ROUTE } from "../router/consts"
import { useActions } from '../hooks/useActions'
import { useCreateListMutation, useGetListsQuery } from '../store/api/todo.api'

const initialData = {
	name: ''
}

const Todo = () => {

	const navigate = useNavigate()
	const [listName, setListName] = useState(initialData)
	
	const { isLoading, data: lists, isSuccess, refetch } = useGetListsQuery()
	const { isAuth } = useActions()
	const [createList] = useCreateListMutation()


	function logout() {
		try {
			localStorage.removeItem('jwt')
			isAuth(false)
			navigate(LOGIN_ROUTE)
		} catch (error) {
			console.error(error)
		}
	}

	const addList = async (e) => {
		try {
			e.preventDefault()
			await createList(listName)
			setListName(initialData)
			await refetch()
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
			<form>
				<label>
					Enter your new list name
					<input type="text" value={listName.name} onChange={e => setListName({ ...listName, name: e.target.value })} />
				</label>
				<button onClick={addList} type='submit'>Add new list</button>
			</form>
			{isSuccess && lists.map(list => (
				<Link to={LIST_ROUTE + `/${list.id}`} key={list.id}>{list.name}</Link>
				// <TaskList listId={list.id} listName={list.name} key={list.id} />
			))}
		</div>
	)
}

export default Todo