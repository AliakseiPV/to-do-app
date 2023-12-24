import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { TODO_ROUTE, LOGIN_ROUTE } from '../router/consts'
import { useActions } from '../hooks/useActions'
import { useAuth } from '../hooks/useAuth'


const NavBar = () => {

	const navigate = useNavigate()
	const { isAuth } = useActions()
	const { auth } = useAuth()

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
			{auth &&
				<>
					<Link to={TODO_ROUTE}>Todo</Link>
					<button onClick={logout}>Logout</button>
				</>
			}
		</div>

	)
}

export default NavBar