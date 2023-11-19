import React, { useState } from 'react'
import { useCreateUserMutation } from '../../store/api/user.api'

const initialValue = {
	id: null,
	userName: '',
	password: ''
}

const SignUp = () => {

	const [user, setUser] = useState(initialValue)

	const [createUser] = useCreateUserMutation()

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(user)
		createUser(user)
			.then(() => setUser(initialValue))
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				<input type="text" placeholder='User Name' value={user.userName} onChange={e => setUser({...user, userName: e.target.value})}/>
			</label>
			<label>
				<input type="email" placeholder='Email' value={user.email} onChange={e => setUser({ ...user, password: e.target.value })} />
			</label>
			<button type='submit'>SignUp</button>
		</form>
	)
}

export default SignUp