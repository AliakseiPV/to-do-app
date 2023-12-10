import React from 'react'
import TaskList from '../components/TaskList'
import Task from '../components/Task'
import { useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE } from "../router/consts"
import { useActions } from '../hooks/useActions'


const Todo = () => {

	const { isAuth } = useActions()

	const navigate = useNavigate()
	function logout() {
		try {
			localStorage.removeItem('jwt')
			isAuth(false)
			navigate(LOGIN_ROUTE)
		} catch (error) {
			console.error(error)
		}

	}
	return (
		<div>
			<TaskList>
				<button onClick={logout}>Logout</button>
				<Task />
				<Task />
				<Task />
			</TaskList>
		</div>
	)
}

export default Todo