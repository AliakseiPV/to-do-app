import React, { useState } from 'react'
import { useCreateUserMutation } from '../../store/api/user.api'

const initialValue = {
	email: '',
	password: ''
}

const SignUp = () => {

	const [user, setUser] = useState(initialValue)

	const [createUser] = useCreateUserMutation()

	const handleSubmit = (e) => {
		e.preventDefault()
		createUser(user)
			.then(() => setUser(initialValue))
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				<input type="email" placeholder='User Email' value={user.email} onChange={e => setUser({ ...user, email: e.target.value})}/>
			</label>
			<label>
				<input type="password" placeholder='Password' value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} />
			</label>
			<button type='submit'>SignUp</button>
		</form>
	)
}

export default SignUp