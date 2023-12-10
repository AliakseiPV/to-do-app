import React, { useState } from 'react'
import { useLoginUserMutation } from '../store/api/user.api'
import { SIGNUP_ROUTE } from '../router/consts'
import { Link, useNavigate } from 'react-router-dom'
import { TODO_ROUTE } from "../router/consts"
import { useActions } from '../hooks/useActions'


const Login = () => {

	const [user, setUser] = useState({
		email: '',
		password: ''
	})

	const navigate = useNavigate()
	const { isAuth } = useActions()


	const [loginUser] = useLoginUserMutation()

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const data = await loginUser(user)
			localStorage.setItem('jwt', data.data.token)
			isAuth(true)
			if (localStorage.getItem('jwt')) {
				navigate(TODO_ROUTE)
			}
		} catch (error) {
			console.log(error.response.data.message)
		}
	}



	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					Email
					<input
						type="email"
						placeholder='Enter your email'
						value={user.email}
						onChange={e => setUser({ ...user, email: e.target.value })}
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						placeholder='Enter your password'
						value={user.password}
						onChange={e => setUser({ ...user, password: e.target.value })}
						required
					/>
				</label>
				<button type='submit'>Login</button>
				<div>
					Dont have an account
					<Link to={SIGNUP_ROUTE}>SignUp</Link> 
				</div>

			</form>
		</div>
	)
}

export default Login