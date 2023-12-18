import React, { useState } from 'react'
import { useCreateUserMutation } from '../store/api/user.api'
import { LOGIN_ROUTE } from '../router/consts'
import { Link, useNavigate } from 'react-router-dom'

const initialValue = {
	email: '',
	password: ''
}

const SignUp = () => {

	const [user, setUser] = useState(initialValue)
	const [createUser] = useCreateUserMutation()
	const navigate = useNavigate()

	const handleSubmit = async(e) => {
		try {
			e.preventDefault()
			await createUser(user)
			setUser(initialValue)
			navigate(LOGIN_ROUTE)
		} catch (error) {
			console.error(error.message);
		}
	}

	return (
		<div className="flex flex-col items-center justify-center mx-auto h-screen bg-bgwhite">
			<form
				onSubmit={handleSubmit}
				className="w-[400px] h-[450px] justify-center flex flex-col shadow-lg shadow-purple1 px-10 py-10 rounded-lg bg-white"
			>
				<h1 className="text-2xl font-bold text-gray-900 mb-10">
					Sign in to your account
				</h1>
				<label className="flex flex-col mb-5 text-lg text-gray-900">
					Email
					<input
						type="email"
						placeholder='User Email'
						value={user.email}
						onChange={e => setUser({ ...user, email: e.target.value })}
						required
						className="px-4 py-1.5 my-2 border-b-2 border-lightpurple focus:outline-none autofill:bg-white"
					/>
				</label>
				<label className="flex flex-col mb-5 text-lg text-gray-900">
					Password
					<input
						type="password"
						placeholder='Password'
						value={user.password}
						onChange={e => setUser({ ...user, password: e.target.value })}
						required
						className="px-4 py-1.5 my-2 border-b-2 border-lightpurple focus:outline-none autofill:bg-white"
					/>
				</label>
				<button
					type='submit'
					className='bg-lightpurple rounded-lg py-3 active:bg-purple1 mt-5'
				>
					SignUp
				</button>
			</form>
			<div className='mt-5'>
				Already have an account
				<Link
					to={LOGIN_ROUTE}
					className='text-lightpurple pl-5 text-lg'
				>
					Login
				</Link> <br />
			</div>
		</div>
	)
}

export default SignUp