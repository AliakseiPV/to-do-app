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
			console.log(error.message)
		}
	}


	return (
		<div className="flex flex-col items-center justify-center mx-auto h-screen bg-bgwhite">
			<form
				onSubmit={handleSubmit}
				className="w-[400px] h-[450px] flex flex-col justify-center shadow-lg shadow-purple1 px-10 py-10 rounded-lg bg-white"
			>
				<h1 className="text-2xl font-bold text-gray-900 mb-10">
					Login to your account
				</h1>
				<label className="flex flex-col mb-5 text-lg text-gray-900">
					Email
					<input
						type="email"
						placeholder='Enter your email'
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
						placeholder='Enter your password'
						value={user.password}
						onChange={e => setUser({ ...user, password: e.target.value })}
						className="px-4 py-1.5 my-2 border-b-2 border-lightpurple focus:outline-none autofill:bg-white"
						required
					/>
				</label>
				<button
					type='submit'
					className='bg-lightpurple rounded-lg py-3 active:bg-purple1 mt-5'
				>
					Login
				</button>
			</form>
			<div className='mt-5'>
				<span>
					Dont have an account
				</span>
				<Link
					to={SIGNUP_ROUTE}
					className='text-lightpurple pl-5 text-lg'
				>
					SignUp
				</Link>
			</div>
		</div>

	)
}

export default Login