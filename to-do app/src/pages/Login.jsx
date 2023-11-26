import React, { useState } from 'react'
import { useLoginUserMutation } from '../store/api/user.api'
import { SIGNUP_ROUTE } from '../router/consts'
import {  Link } from 'react-router-dom'

const Login = () => {

	const [user, setUser] = useState({
		email: '',
		password: ''
	})
	const [loginUser] = useLoginUserMutation()

	const handleSubmit = (e) => {
		e.preventDefault()

		loginUser(user)
			.then((data) =>
				localStorage.setItem('jwt', data.data.token)
				// console.log(data.data.token)
		)
		console.log(localStorage.getItem('jwt'))
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
					<Link to={SIGNUP_ROUTE}>SignUp</Link> <br />
				</div>
				
			</form>
		</div>
	)
}

export default Login