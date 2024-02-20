import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { TODO_ROUTE, LOGIN_ROUTE } from '../router/consts'
import { useActions } from '../hooks/useActions'
import { useAuth } from '../hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'


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

		<div className='flex justify-between'>
			{auth &&
				<>
					<Link to={TODO_ROUTE}>
						<FontAwesomeIcon icon={faHouse} size="xl" style={{ color: "#BBD0FF", }} />
					</Link>
					<button onClick={logout}>
						<FontAwesomeIcon icon={faDoorOpen} size="xl" style={{ color: "#ff7d7d", }} />
					</button>
				</>
			}
		</div>

	)
}

export default NavBar