import React, { useState } from 'react'
import { useLoginUserMutation } from '../store/api/user.api'

const Login = () => {

	const [user, setUser] = useState({
		email: '',
		password: ''
	})
	const [loginUser] = useLoginUserMutation()

	const handleSubmit = (e) => {
		e.preventDefault()

		loginUser(user)
			.then((data) => console.log(data))
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
			</form>
		</div>
	)
}

export default Login